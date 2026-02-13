
import Link from "next/link";

export default function TemplatesPage() {
    const templates = [
        { name: "Professional", description: "Clean and modern for corporate roles.", color: "bg-blue-500" },
        { name: "Creative", description: "Bold and unique for creative industries.", color: "bg-purple-500" },
        { name: "Executive", description: "Elegant and sophisticated for leadership.", color: "bg-gray-800" },
        { name: "Minimalist", description: "Simple and direct for clarity.", color: "bg-green-500" },
    ];

    return (
        <main className="container section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <h1 className="section-title" style={{ marginBottom: "var(--space-lg)" }}>Resume Templates</h1>
                <p style={{ fontSize: "var(--text-lg)", color: "var(--text-secondary)", marginBottom: "var(--space-2xl)" }}>
                    Choose from our ATS-friendly templates designed to help you land your dream job.
                </p>

                <div className="features-grid">
                    {templates.map((template, index) => (
                        <div key={index} className="feature-card" style={{ padding: "var(--space-xl)", background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)" }}>
                            <div style={{ height: "200px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--text-xl)", fontWeight: "bold", color: "var(--text-muted)" }}>
                                {template.name} Preview
                            </div>
                            <h3 className="feature-title">{template.name}</h3>
                            <p className="feature-desc">{template.description}</p>
                            <Link href="/builder" className="btn btn-outline btn-sm" style={{ marginTop: "var(--space-md)", width: "100%" }}>
                                Use This Template
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
