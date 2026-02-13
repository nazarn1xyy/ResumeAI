"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    HiOutlineBars3,
    HiOutlineXMark,
    HiOutlineSun,
    HiOutlineMoon,
    HiOutlineUser,
    HiOutlineArrowRightOnRectangle,
    HiOutlineSquares2X2,
} from "react-icons/hi2";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const updateThemeColor = (theme: "light" | "dark") => {
        const color = theme === "dark" ? "#121212" : "#f5f5f5";
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute("content", color);
        } else {
            const newMeta = document.createElement("meta");
            newMeta.name = "theme-color";
            newMeta.content = color;
            document.head.appendChild(newMeta);
        }
    };

    useEffect(() => {
        const saved = (localStorage.getItem("resumeai_theme") as "dark" | "light") || "dark";
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
        updateThemeColor(saved);
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("resumeai_theme", next);
        document.documentElement.setAttribute("data-theme", next);
        updateThemeColor(next);
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        router.push("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link href="/" className="navbar-logo">
                    <Logo width={32} height={32} style={{ color: "var(--accent-primary)" }} />
                    ResumeAI
                </Link>

                <div className="navbar-links">
                    <Link href="/" className={pathname === "/" ? "nav-active" : ""}>Home</Link>
                    <Link href="/builder" className={pathname === "/builder" ? "nav-active" : ""}>Resume Builder</Link>
                    <Link href="/cover-letter" className={pathname === "/cover-letter" ? "nav-active" : ""}>Cover Letter</Link>
                    <Link href="/blog" className={pathname?.startsWith("/blog") ? "nav-active" : ""}>Blog</Link>
                    <Link href="/#pricing">Pricing</Link>
                </div>

                <div className="navbar-actions">
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
                    </button>

                    {user ? (
                        <div className="user-menu-wrapper">
                            <button className="user-avatar-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                                <div className="user-avatar-small">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </button>
                            {userMenuOpen && (
                                <div className="user-dropdown glass-card">
                                    <div className="user-dropdown-header">
                                        <div className="user-avatar-small">{user.name.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <div className="user-dropdown-name">{user.name}</div>
                                            <div className="user-dropdown-email">{user.email}</div>
                                        </div>
                                    </div>
                                    <div className="user-dropdown-divider" />
                                    <Link href="/dashboard" className="user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                        <HiOutlineSquares2X2 /> Dashboard
                                    </Link>
                                    <Link href="/builder" className="user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                        <Logo width={16} height={16} style={{ color: "var(--accent-primary)" }} /> New Resume
                                    </Link>
                                    <div className="user-dropdown-divider" />
                                    <button className="user-dropdown-item" onClick={handleLogout}>
                                        <HiOutlineArrowRightOnRectangle /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/login" className="btn btn-ghost btn-sm">Sign In</Link>
                            <Link href="/auth/register" className="btn btn-primary btn-sm">
                                <Logo width={16} height={16} style={{ color: "var(--bg-primary)" }} /> Get Started
                            </Link>
                        </>
                    )}
                </div>

                <button className="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                    {mobileOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
                </button>
            </div>

            {mobileOpen && (
                <div className="mobile-menu">
                    <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
                    <Link href="/builder" onClick={() => setMobileOpen(false)}>Resume Builder</Link>
                    <Link href="/cover-letter" onClick={() => setMobileOpen(false)}>Cover Letter</Link>
                    <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                            <button onClick={() => { handleLogout(); setMobileOpen(false); }}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
                            <Link href="/auth/register" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
