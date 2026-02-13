
export default function ContactPage() {
    return (
        <main className="container section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="section-title" style={{ marginBottom: "var(--space-lg)" }}>Contact Us</h1>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", marginBottom: "var(--space-xl)" }}>
                    Have questions or feedback? We'd love to hear from you.
                </p>

                <div style={{ padding: "var(--space-xl)", background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)" }}>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
                        For support inquiries, please email us at:
                    </p>
                    <a href="mailto:support@resumeai.com" className="text-xl font-bold text-accent-primary hover:underline" style={{ display: "block", marginBottom: "var(--space-lg)" }}>
                        support@resumeai.com
                    </a>

                    <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
                        For business inquiries:
                    </p>
                    <a href="mailto:business@resumeai.com" className="text-lg font-medium text-accent-secondary hover:underline">
                        business@resumeai.com
                    </a>
                </div>
            </div>
        </main>
    );
}
