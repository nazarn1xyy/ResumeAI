"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
            </div>
            <div className="auth-card glass-card">
                <div className="auth-header">
                    <Link href="/" className="auth-logo">
                        <Logo width={32} height={32} style={{ color: "var(--accent-primary)" }} />
                        ResumeAI
                    </Link>
                    <h1 className="auth-title">Welcome back</h1>
                    <p className="auth-subtitle">Sign in to access your resumes</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}

                    <div className="input-group">
                        <label>Email</label>
                        <div className="input-with-icon">
                            <HiOutlineEnvelope className="input-icon" />
                            <input
                                className="input-field"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <HiOutlineLockClosed className="input-icon" />
                            <input
                                className="input-field"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
                        {loading ? <span className="loader" /> : null}
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don&apos;t have an account? <Link href="/auth/register" className="auth-link">Create one</Link></p>
                </div>
            </div>
        </div>
    );
}
