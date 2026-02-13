"use client";

import { useState } from "react";
import {
    HiOutlineSparkles,
    HiOutlineDocumentText,
    HiOutlineArrowDownTray,
} from "react-icons/hi2";
import { generateCoverLetter } from "@/lib/ai";
import { exportCoverLetterToPDF } from "@/lib/pdf";

export default function CoverLetterPage() {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [company, setCompany] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const letter = await generateCoverLetter(
                name,
                position,
                company,
                jobDescription
            );
            setCoverLetter(letter);
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = async () => {
        setExporting(true);
        try {
            await exportCoverLetterToPDF(
                "cover-letter-preview",
                `cover-letter-${company || "document"}.pdf`
            );
        } catch (err) {
            console.error("PDF export failed:", err);
        } finally {
            setExporting(false);
        }
    };

    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const paragraphs = coverLetter.split("\n\n").filter((p) => p.trim());

    return (
        <div className="cover-letter-page">
            <div className="container" style={{ marginBottom: "var(--space-xl)" }}>
                <h1
                    className="section-title"
                    style={{ textAlign: "left", marginBottom: "var(--space-sm)" }}
                >
                    Cover Letter Generator
                </h1>
                <p
                    className="section-subtitle"
                    style={{
                        textAlign: "left",
                        margin: "0",
                        maxWidth: "none",
                    }}
                >
                    Paste a job description and let AI create a tailored cover letter for you.
                </p>
            </div>

            <div className="cover-letter-layout">
                {/* Left — Form */}
                <div className="cover-letter-form">
                    <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
                        <div
                            className="form-section-title"
                            style={{ marginBottom: "var(--space-lg)" }}
                        >
                            <HiOutlineDocumentText className="icon" />
                            Your Details
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--space-md)",
                            }}
                        >
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Your Name</label>
                                    <input
                                        className="input-field"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Position</label>
                                    <input
                                        className="input-field"
                                        placeholder="Software Engineer"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Company Name</label>
                                <input
                                    className="input-field"
                                    placeholder="Google"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Job Description (paste from job listing)</label>
                                <textarea
                                    className="input-field"
                                    placeholder="Paste the full job description here... The more detail you provide, the better the cover letter."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    rows={8}
                                />
                            </div>

                            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleGenerate}
                                    disabled={loading}
                                    style={{ flex: 1 }}
                                >
                                    {loading ? (
                                        <span className="loader" />
                                    ) : (
                                        <HiOutlineSparkles />
                                    )}
                                    {loading ? "Generating..." : "Generate Cover Letter"}
                                </button>
                                {coverLetter && (
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleExportPDF}
                                        disabled={exporting}
                                    >
                                        {exporting ? (
                                            <span className="loader" />
                                        ) : (
                                            <HiOutlineArrowDownTray />
                                        )}
                                        PDF
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {coverLetter && (
                        <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
                            <div
                                className="form-section-title"
                                style={{ marginBottom: "var(--space-md)" }}
                            >
                                <HiOutlineSparkles className="icon" />
                                Edit Your Letter
                            </div>
                            <textarea
                                className="input-field"
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                rows={16}
                                style={{ fontFamily: "var(--font-sans)", lineHeight: 1.7 }}
                            />
                        </div>
                    )}
                </div>

                {/* Right — Preview */}
                <div>
                    <div
                        className="cover-letter-preview"
                        id="cover-letter-preview"
                        style={{ position: "sticky", top: "100px" }}
                    >
                        {coverLetter ? (
                            <>
                                <div className="cl-date">{today}</div>
                                {paragraphs.map((paragraph, idx) => {
                                    if (paragraph.startsWith("Sincerely,")) {
                                        return (
                                            <div key={idx} className="cl-closing">
                                                <p>Sincerely,</p>
                                            </div>
                                        );
                                    }
                                    if (idx === paragraphs.length - 1 && !paragraph.includes(" ")) {
                                        return (
                                            <div key={idx} className="cl-signature">
                                                {paragraph}
                                            </div>
                                        );
                                    }
                                    if (idx === 0) {
                                        return (
                                            <div key={idx} className="cl-body">
                                                <p>{paragraph}</p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={idx} className="cl-body">
                                            <p>{paragraph}</p>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">✉️</div>
                                <p style={{ color: "#888" }}>
                                    Fill in the form and click &quot;Generate&quot;
                                    <br />
                                    to create your cover letter
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ height: "var(--space-4xl)" }} />
        </div>
    );
}
