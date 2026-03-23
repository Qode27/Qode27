import { Header } from '../../components/header';
import { LoginForm } from '../../components/login-form';

export default function LoginPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="space-y-6">
            <p className="section-kicker">Shared Identity</p>
            <h2 className="section-title">One login for Kansalt and every product subdomain.</h2>
            <p className="max-w-2xl text-lg text-slate-600">
              Authentication is issued from the central domain and stored in a cookie scoped to `.kansalt.com`. Apps like HMS and HRMS can read the same session and auto-authenticate users.
            </p>
            <div className="card p-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">How it works</p>
              <div className="mt-4 grid gap-3">
                {[
                  'Login on kansalt.com',
                  'JWT stored in a shared cookie',
                  'Redirect into hms.kansalt.com or any future app',
                  'Subdomain reads the same cookie for SSO-like access'
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 px-4 py-3 font-medium text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
