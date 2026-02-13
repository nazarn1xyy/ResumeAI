"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await register(name, email, password);
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed");
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
                    <h1 className="auth-title">Create your account</h1>
                    <p className="auth-subtitle">Start building professional resumes for free</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}

                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-with-icon">
                            <HiOutlineUser className="input-icon" />
                            <input
                                className="input-field"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

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
                                placeholder="Min. 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>
                        <div className="input-with-icon">
                            <HiOutlineLockClosed className="input-icon" />
                            <input
                                className="input-field"
                                type="password"
                                placeholder="Repeat password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
                        {loading ? <span className="loader" /> : null}
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link href="/auth/login" className="auth-link">Sign in</Link></p>
                </div>
            </div>
        </div>
    );
}
