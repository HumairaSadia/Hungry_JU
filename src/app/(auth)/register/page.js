/**
 * @fileoverview Registration page route. (View)
 * @module app/(auth)/register/page
 */
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        {/* <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-orange-500"> */}
        {/* <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Jahangirnagar University, Savar
        </span> */}

        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
          Create your <br></br>{' '}
          <span className="font-serif font-bold text-orange-500">Hungry_JU</span> <br></br> Account!
        </h1>
      </div>

      <div className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <RegisterForm />
      </div>
    </main>
  );
}
