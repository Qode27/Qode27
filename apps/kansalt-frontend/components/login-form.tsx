'use client';

import { FormEvent, useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message ?? 'Unable to sign in');
      }

      window.location.href = '/dashboard';
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-8">
      <div>
        <p className="section-kicker">Central Login</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">Sign in once, launch apps anywhere.</h1>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-600">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-ink"
          placeholder="admin@kansalt.com"
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-600">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-ink"
          placeholder="Enter your password"
          required
        />
      </label>

      {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
      >
        {loading ? 'Signing in...' : 'Login to Kansalt'}
      </button>
    </form>
  );
}
