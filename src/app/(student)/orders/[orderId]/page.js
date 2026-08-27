"use client";

/**
 * @file View for `/orders/[orderId]`.
 *
 * Presentation only: the view renders order tracking state and forwards
 * user intent to the API. Business rules and authorization remain
 * server-side (NFR-12).
 *
 * @module app/(student)/orders/[orderId]/page
 */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";


const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";


const STATUS_STEPS = [
    {
        key: "Placed",
        label: "Order Placed"
    },
    {
        key: "Preparing",
        label: "Preparing"
    },
    {
        key: "Ready",
        label: "Ready for Pickup"
    },
    {
        key: "PickedUp",
        label: "Picked Up"
    },
    {
        key: "Delivered",
        label: "Delivered"
    }
];


function getStepState(
    currentStatus,
    stepStatus
) {

    const statusOrder = [
        "Placed",
        "Preparing",
        "Ready",
        "PickedUp",
        "Delivered"
    ];

    const currentIndex =
        statusOrder.indexOf(currentStatus);

    const stepIndex =
        statusOrder.indexOf(stepStatus);

    if (currentStatus === "Cancelled") {
        return "cancelled";
    }

    if (stepIndex < currentIndex) {
        return "completed";
    }

    if (stepIndex === currentIndex) {
        return "current";
    }

    return "pending";
}


export default function OrderTrackingPage() {

    const params = useParams();

    const orderId =
        params?.orderId;


    const [tracking, setTracking] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [cancelling, setCancelling] =
        useState(false);


    /*
     * Fetch order tracking information.
     */
    useEffect(() => {

        if (!orderId) {
            return;
        }


        async function loadTracking() {

            try {

                setLoading(true);
                setError("");


                const token =
                    localStorage.getItem(
                        "token"
                    );


                const response =
                    await fetch(
                        `${API_URL}/api/v1/orders/${orderId}/tracking`,
                        {
                            method: "GET",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                ...(token
                                    ? {
                                        Authorization:
                                            `Bearer ${token}`
                                    }
                                    : {})
                            }
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Failed to load order tracking"
                    );
                }


                setTracking(
                    result.data
                );

            } catch (err) {

                setError(
                    err.message ||
                    "Unable to load tracking information"
                );

            } finally {

                setLoading(false);

            }

        }


        loadTracking();

    }, [orderId]);


    /*
     * Listen for real-time order status updates.
     */
    useEffect(() => {

        if (!orderId) {
            return;
        }


        const socket =
            io(API_URL);


        socket.emit(
            "join-order",
            orderId
        );


        socket.on(
            "order-status-updated",
            (data) => {

                if (
                    String(data.orderId) !==
                    String(orderId)
                ) {
                    return;
                }


                setTracking(
                    (previous) => {

                        if (!previous) {
                            return previous;
                        }


                        return {
                            ...previous,

                            status:
                                data.status,

                            updatedAt:
                                data.updatedAt
                        };

                    }
                );

            }
        );


        return () => {

            socket.emit(
                "leave-order",
                orderId
            );

            socket.disconnect();

        };

    }, [orderId]);


    /*
     * Cancel order.
     *
     * Eligibility is decided by the backend.
     * The frontend only sends the request.
     */
    async function handleCancel() {

        try {

            setCancelling(true);
            setError("");


            const token =
                localStorage.getItem(
                    "token"
                );


            const response =
                await fetch(
                    `${API_URL}/api/v1/orders/${orderId}/cancel`,
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type":
                                "application/json",

                            ...(token
                                ? {
                                    Authorization:
                                        `Bearer ${token}`
                                    }
                                : {})
                        },

                        body: JSON.stringify({
                            reason:
                                "Cancelled by student"
                        })
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Unable to cancel order"
                );

            }


            setTracking(
                (previous) => {

                    if (!previous) {
                        return previous;
                    }

                    return {
                        ...previous,

                        status: "Cancelled",

                        updatedAt:
                            result.updatedAt ||
                            new Date().toISOString()
                    };

                }
            );


        } catch (err) {

            setError(
                err.message ||
                "Unable to cancel order"
            );

        } finally {

            setCancelling(false);

        }

    }


    if (loading) {

        return (
            <main>
                <h1>Order Tracking</h1>

                <p>
                    Loading order tracking...
                </p>
            </main>
        );

    }


    if (error && !tracking) {

        return (
            <main>
                <h1>Order Tracking</h1>

                <p>
                    {error}
                </p>
            </main>
        );

    }


    if (!tracking) {

        return (
            <main>
                <h1>Order Tracking</h1>

                <p>
                    Order information not found.
                </p>
            </main>
        );

    }


    const currentStatus =
        tracking.status;


    const canShowCancel =
        currentStatus === "Placed" ||
        currentStatus === "Preparing";


    return (
        <main>

            <header>

                <h1>
                    Order Tracking
                </h1>

                <p>
                    Order #{tracking.orderId}
                </p>

            </header>


            {error && (
                <p role="alert">
                    {error}
                </p>
            )}


            <section>

                <h2>
                    Current Status
                </h2>

                <p>
                    {currentStatus}
                </p>

            </section>


            <section>

                <h2>
                    Order Progress
                </h2>


                <ol>

                    {STATUS_STEPS.map(
                        (step) => {

                            const state =
                                getStepState(
                                    currentStatus,
                                    step.key
                                );


                            return (
                                <li
                                    key={step.key}
                                >

                                    <strong>
                                        {state ===
                                            "completed"
                                            ? "✓ "
                                            : ""}

                                        {state ===
                                            "current"
                                            ? "● "
                                            : ""}

                                        {step.label}
                                    </strong>

                                </li>
                            );

                        }
                    )}

                </ol>

            </section>


            <section>

                <h2>
                    Delivery Information
                </h2>

                <p>
                    Hall:{" "}
                    {tracking.delivery?.hall ||
                        "Not available"}
                </p>

                <p>
                    Room:{" "}
                    {tracking.delivery?.room ||
                        "Not available"}
                </p>

                <p>
                    Rider ID:{" "}
                    {tracking.delivery?.riderId ||
                        "Not assigned"}
                </p>

            </section>


            {canShowCancel && (
                <section>

                    <button
                        type="button"
                        onClick={
                            handleCancel
                        }
                        disabled={
                            cancelling
                        }
                    >

                        {cancelling
                            ? "Cancelling..."
                            : "Cancel Order"}

                    </button>

                </section>
            )}


            {currentStatus ===
                "Cancelled" && (
                    <section>

                        <p>
                            This order has
                            been cancelled.
                        </p>

                    </section>
                )}

        </main>
    );
}