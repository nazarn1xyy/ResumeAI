import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function AboutPage() {
    return (
        <main className="container section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="section-title" style={{ marginBottom: "var(--space-lg)" }}>About ResumeAI</h1>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
                    ResumeAI is an AI-powered resume builder designed to help job seekers create professional, ATS-optimized resumes in minutes.
                </p>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", marginBottom: "var(--space-xl)" }}>
                    Our mission is to democratize career success by providing top-tier tools that were previously only available to professional resume writers.
                </p>

                <div style={{ padding: "var(--space-xl)", background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-2xl)" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", marginBottom: "var(--space-md)" }}>Our Story</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
                        Founded in 2026, ResumeAI started with a simple idea: applying for jobs shouldn't be a full-time job. We leveraged the latest advancements in Large Language Models to create a tool that understands your experience and translates it into compelling professional narratives.
                    </p>
                </div>

                <Link href="/builder" className="btn btn-primary">
                    Build Your Resume <HiOutlineArrowRight />
                </Link>
            </div>
        </main>
    );
}
