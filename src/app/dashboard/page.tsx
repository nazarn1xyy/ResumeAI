"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    HiOutlinePlus,
    HiOutlineDocumentText,
    HiOutlineTrash,
    HiOutlineDocumentDuplicate,
    HiOutlineEye,
    HiOutlineArrowDownTray,
    HiOutlineGlobeAlt,
    HiOutlineLockClosed,
    HiOutlineSparkles,
    HiOutlineChartBarSquare,
    HiOutlineEnvelope,
} from "react-icons/hi2";
import { useAuth } from "@/lib/auth";
import {
    getUserResumes,
    deleteResume,
    duplicateResume,
    togglePublic,
    SavedResume,
    getUserCoverLetters,
    SavedCoverLetter,
} from "@/lib/storage";

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [resumes, setResumes] = useState<SavedResume[]>([]);
    const [coverLetters, setCoverLetters] = useState<SavedCoverLetter[]>([]);
    const [activeTab, setActiveTab] = useState<"resumes" | "coverletters" | "analytics">("resumes");

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/auth/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            setResumes(getUserResumes(user.id));
            setCoverLetters(getUserCoverLetters(user.id));
        }
    }, [user]);

    const handleDelete = (id: string) => {
        if (confirm("Delete this resume?")) {
            deleteResume(id);
            if (user) setResumes(getUserResumes(user.id));
        }
    };

    const handleDuplicate = (id: string) => {
        duplicateResume(id);
        if (user) setResumes(getUserResumes(user.id));
    };

    const handleTogglePublic = (id: string) => {
        togglePublic(id);
        if (user) setResumes(getUserResumes(user.id));
    };

    if (authLoading) {
        return (
            <div className="dashboard-loading">
                <span className="loader" style={{ width: 40, height: 40 }} />
            </div>
        );
    }

    if (!user) return null;

    const totalViews = resumes.reduce((s, r) => s + r.views, 0);
    const totalDownloads = resumes.reduce((s, r) => s + r.downloads, 0);

    return (
        <div className="dashboard-page">
            <div className="container">
                {/* Header */}
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">
                            Welcome back, <span className="gradient-text">{user.name.split(" ")[0]}</span>
                        </h1>
                        <p className="dashboard-subtitle">Manage your resumes and cover letters</p>
                    </div>
                    <div className="dashboard-header-actions">
                        <Link href="/builder" className="btn btn-primary">
                            <HiOutlinePlus /> New Resume
                        </Link>
                        <Link href="/cover-letter" className="btn btn-secondary">
                            <HiOutlineEnvelope /> New Cover Letter
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="glass-card stat-card">
                        <div className="stat-icon"><HiOutlineDocumentText /></div>
                        <div className="stat-value">{resumes.length}</div>
                        <div className="stat-label">Resumes</div>
                    </div>
                    <div className="glass-card stat-card">
                        <div className="stat-icon"><HiOutlineEnvelope /></div>
                        <div className="stat-value">{coverLetters.length}</div>
                        <div className="stat-label">Cover Letters</div>
                    </div>
                    <div className="glass-card stat-card">
                        <div className="stat-icon"><HiOutlineEye /></div>
                        <div className="stat-value">{totalViews}</div>
                        <div className="stat-label">Total Views</div>
                    </div>
                    <div className="glass-card stat-card">
                        <div className="stat-icon"><HiOutlineArrowDownTray /></div>
                        <div className="stat-value">{totalDownloads}</div>
                        <div className="stat-label">Downloads</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="dashboard-tabs">
                    <button className={`tab-btn ${activeTab === "resumes" ? "active" : ""}`} onClick={() => setActiveTab("resumes")}>
                        <HiOutlineDocumentText /> Resumes
                    </button>
                    <button className={`tab-btn ${activeTab === "coverletters" ? "active" : ""}`} onClick={() => setActiveTab("coverletters")}>
                        <HiOutlineEnvelope /> Cover Letters
                    </button>
                    <button className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`} onClick={() => setActiveTab("analytics")}>
                        <HiOutlineChartBarSquare /> Analytics
                    </button>
                </div>

                {/* Content */}
                {activeTab === "resumes" && (
                    <div className="resume-grid">
                        {/* Create New Card */}
                        <Link href="/builder" className="glass-card resume-card create-card">
                            <div className="create-card-icon"><HiOutlinePlus /></div>
                            <div className="create-card-text">Create New Resume</div>
                        </Link>

                        {resumes.map((resume) => (
                            <div key={resume.id} className="glass-card resume-card">
                                <div className="resume-card-preview">
                                    <div className="resume-card-template">{resume.template}</div>
                                </div>
                                <div className="resume-card-info">
                                    <h3 className="resume-card-name">{resume.name}</h3>
                                    <p className="resume-card-date">
                                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                                    </p>
                                    {resume.atsScore !== undefined && (
                                        <div className="resume-card-ats">
                                            <HiOutlineSparkles />
                                            ATS Score: {resume.atsScore}%
                                        </div>
                                    )}
                                    <div className="resume-card-stats">
                                        <span><HiOutlineEye /> {resume.views}</span>
                                        <span><HiOutlineArrowDownTray /> {resume.downloads}</span>
                                    </div>
                                </div>
                                <div className="resume-card-actions">
                                    <Link href={`/builder?id=${resume.id}`} className="btn btn-ghost btn-sm">
                                        Edit
                                    </Link>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleDuplicate(resume.id)}>
                                        <HiOutlineDocumentDuplicate />
                                    </button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleTogglePublic(resume.id)} title={resume.isPublic ? "Make private" : "Share publicly"}>
                                        {resume.isPublic ? <HiOutlineGlobeAlt /> : <HiOutlineLockClosed />}
                                    </button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(resume.id)} style={{ color: "var(--error)" }}>
                                        <HiOutlineTrash />
                                    </button>
                                </div>
                                {resume.isPublic && resume.publicSlug && (
                                    <div className="resume-card-link">
                                        🔗 /resume/{resume.publicSlug}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "coverletters" && (
                    <div className="resume-grid">
                        <Link href="/cover-letter" className="glass-card resume-card create-card">
                            <div className="create-card-icon"><HiOutlinePlus /></div>
                            <div className="create-card-text">Create New Cover Letter</div>
                        </Link>
                        {coverLetters.map((cl) => (
                            <div key={cl.id} className="glass-card resume-card">
                                <div className="resume-card-info" style={{ padding: "var(--space-lg)" }}>
                                    <h3 className="resume-card-name">{cl.name || cl.position}</h3>
                                    <p className="resume-card-date">{cl.company}</p>
                                    <p className="resume-card-date">
                                        {new Date(cl.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "analytics" && (
                    <div className="analytics-section">
                        <div className="glass-card" style={{ padding: "var(--space-2xl)", textAlign: "center" }}>
                            <HiOutlineChartBarSquare style={{ fontSize: "48px", color: "var(--accent-secondary)", marginBottom: "var(--space-md)" }} />
                            <h3 style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-sm)" }}>Resume Analytics</h3>
                            <p style={{ color: "var(--text-secondary)" }}>
                                Track how your resumes perform. Views, downloads, and engagement metrics.
                            </p>
                            <div className="analytics-chart-placeholder">
                                <div className="analytics-bar" style={{ height: "60%" }}><span>Mon</span></div>
                                <div className="analytics-bar" style={{ height: "80%" }}><span>Tue</span></div>
                                <div className="analytics-bar" style={{ height: "45%" }}><span>Wed</span></div>
                                <div className="analytics-bar" style={{ height: "90%" }}><span>Thu</span></div>
                                <div className="analytics-bar" style={{ height: "70%" }}><span>Fri</span></div>
                                <div className="analytics-bar" style={{ height: "50%" }}><span>Sat</span></div>
                                <div className="analytics-bar" style={{ height: "30%" }}><span>Sun</span></div>
                            </div>
                            <div className="analytics-summary">
                                <div><strong>{totalViews}</strong> Total Views</div>
                                <div><strong>{totalDownloads}</strong> Total Downloads</div>
                                <div><strong>{resumes.filter(r => r.isPublic).length}</strong> Public Resumes</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
