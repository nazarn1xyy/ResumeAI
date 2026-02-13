
export default function TermsPage() {
    return (
        <main className="container section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="section-title" style={{ marginBottom: "var(--space-lg)" }}>Terms of Service</h1>
                <p style={{ color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
                    Last updated: February 13, 2026
                </p>

                <div style={{ lineHeight: "1.7", color: "var(--text-secondary)" }}>
                    <p className="mb-4">
                        Welcome to ResumeAI! By accessing or using our services, you agree to comply with and be bound by these Terms of Service.
                    </p>

                    <h2 className="text-xl font-bold text-accent-primary mt-8 mb-4">1. Use of Services</h2>
                    <p className="mb-4">
                        You may use our services for lawful purposes only. You agree not to use our services for any illegal or unauthorized purpose.
                    </p>

                    <h2 className="text-xl font-bold text-accent-primary mt-8 mb-4">2. Intellectual Property</h2>
                    <p className="mb-4">
                        All content and materials provided on our services, including but not limited to text, graphics, logos, and software, are the property of ResumeAI or its licensors.
                    </p>

                    <h2 className="text-xl font-bold text-accent-primary mt-8 mb-4">3. Limitation of Liability</h2>
                    <p className="mb-4">
                        ResumeAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our services.
                    </p>
                </div>
            </div>
        </main>
    );
}
