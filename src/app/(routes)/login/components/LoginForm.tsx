"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center gap-3 justify-center">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await signIn("credentials", { email, password });
              redirect("/dashboard");
            } catch (err) {
              setError("Failed to sign in");
              console.error(err);
            }
          }}
          className="card-body"
        >
          <h2 className="card-title text-2xl font-bold mb-4">Login</h2>
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="alert alert-error mt-4">
              <svg
                onClick={() => setError("")}
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6 hover:cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Brukere:</h2>
          <p>email: john.doe@example.com passord: password123 </p>
          <p>email: jane.doe@example.com passord: password123 </p>
        </div>
      </div>
    </div>
  );
}
