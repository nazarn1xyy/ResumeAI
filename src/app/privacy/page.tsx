
export default function PrivacyPage() {
    return (
        <main className="container section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="section-title" style={{ marginBottom: "var(--space-lg)" }}>Privacy Policy</h1>
                <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
                    Last updated: February 13, 2026
                </p>

                <div style={{ lineHeight: "1.7", color: "var(--text-secondary)" }}>
                    <p className="mb-4">
                        At ResumeAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
                    </p>

                    <h2 className="text-xl font-bold text-accent-primary mt-8 mb-4">1. Information We Collect</h2>
                    <p className="mb-4">
                        We collect information you provide directly to us, such as your name, email address, and resume details when you use our services.
                    </p>

                    <h2 className="text-xl font-bold text-accent-primary mt-8 mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">
                        We use your information to provide, maintain, and improve our services, including generating your resume and cover letters.
                    </p>

                    <h2 className="text-xl font-bold text-accent-primary mt-8 mb-4">3. Data Security</h2>
                    <p className="mb-4">
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.
                    </p>
                </div>
            </div>
        </main>
    );
}
