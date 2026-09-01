/**
 * @fileoverview POST /api/auth/register — thin HTTP entry point that
 * delegates to the controller. No business logic here.
 * @module app/api/auth/register/route
 */
import { NextResponse } from 'next/server';
import { registerUserController } from '@/controllers/auth.controller';

/**
 * @param {Request} request
 * @returns {Promise<NextResponse>}
 */
export async function POST(request) {
  const form = await request.json();
  const result = await registerUserController(form);

  if (!result.success) {
    return NextResponse.json({ errors: result.errors }, { status: result.status });
  }
  return NextResponse.json({ data: result.data }, { status: result.status });
}
