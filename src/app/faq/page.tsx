
export default function FAQPage() {
    const faqs = [
        { question: "Is ResumeAI free?", answer: "Yes, we offer a free plan that allows you to create and download a professional resume. We also have premium plans with advanced features." },
        { question: "How does the AI work?", answer: "Our AI analyzes your input and job descriptions to generate tailored content that highlights your skills and experience effectively." },
        { question: "Can I download my resume as a PDF?", answer: "Absolutely! You can download your resume in PDF format, which is perfect for submitting to job applications." },
        { question: "Is my data secure?", answer: "Yes, we prioritize your data security. Your personal information is encrypted and protected." },
    ];

    return (
        <main className="container section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="section-title" style={{ marginBottom: "var(--space-lg)" }}>Frequently Asked Questions</h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={{ padding: "var(--space-lg)", background: "var(--bg-secondary)", borderRadius: "var(--radius-lg)" }}>
                            <h3 className="text-xl font-bold text-accent-primary mb-2">{faq.question}</h3>
                            <p style={{ color: "var(--text-secondary)" }}>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
