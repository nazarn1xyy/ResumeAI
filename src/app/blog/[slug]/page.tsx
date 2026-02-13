import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineSparkles, HiOutlineClock } from "react-icons/hi2";

const articles: Record<string, { title: string; category: string; readTime: string; date: string; content: string }> = {
    "how-to-write-resume-2026": {
        title: "How to Write a Perfect Resume in 2026",
        category: "Resume Tips",
        readTime: "8 min read",
        date: "February 10, 2026",
        content: `## The Modern Resume Landscape

The job market in 2026 has evolved significantly. With AI-powered hiring tools, remote work being the norm, and skills-based hiring gaining momentum, your resume needs to adapt.

### 1. Start with a Strong Professional Summary

Your summary should be 2-3 sentences that capture your value proposition. Instead of "Experienced professional seeking opportunities," try:

**"Results-driven software engineer with 5+ years building scalable cloud applications. Led a team of 8 engineers at TechCorp, delivering a platform that processes 10M+ daily transactions. Passionate about clean code and mentoring junior developers."**

### 2. Quantify Your Achievements

Numbers speak louder than words. Transform your bullet points:

- ❌ "Managed social media accounts"
- ✅ "Grew social media engagement by 340% across 4 platforms, generating 50K+ monthly impressions"

### 3. Optimize for ATS Systems

Over 90% of large companies use Applicant Tracking Systems. To pass:

- Use standard section headers (Experience, Education, Skills)
- Include keywords from the job description
- Avoid tables, graphics, and unusual formatting
- Use a clean, single-column layout

### 4. Tailor for Each Application

Generic resumes get generic results. For each application:

1. Read the job description carefully
2. Identify the top 5 requirements
3. Mirror those keywords in your experience
4. Adjust your summary to match the role

### 5. Keep It Concise

- **0-5 years experience**: 1 page
- **5-15 years experience**: 1-2 pages
- **15+ years experience**: 2 pages max

### 6. Modern Design Matters

Choose a clean, professional template. In 2026, the trend is:

- Minimal color accents
- Clear hierarchy
- Plenty of white space
- Professional fonts (Inter, Roboto, Calibri)

### Ready to Apply These Tips?

Use ResumeAI to create a professionally designed, ATS-optimized resume in minutes. Our AI helps you craft powerful bullet points and ensures your resume passes automated screening.`,
    },
    "top-resume-mistakes": {
        title: "10 Resume Mistakes That Cost You the Interview",
        category: "Career Advice",
        readTime: "6 min read",
        date: "February 8, 2026",
        content: `## Avoid These Fatal Resume Errors

Even qualified candidates get rejected due to avoidable resume mistakes. Here are the top 10:

### 1. 🚫 Typos and Grammar Errors
Nothing says "I don't pay attention to detail" like a typo. Always proofread — or use AI tools to catch errors.

### 2. 🚫 Generic Objective Statements
"Seeking a challenging position where I can utilize my skills" tells the recruiter nothing. Replace with a specific, achievement-focused summary.

### 3. 🚫 Listing Duties Instead of Achievements
Recruiters want to see impact, not job descriptions they already know.

### 4. 🚫 Making It Too Long
Recruiters spend an average of 7 seconds on initial resume screening. Keep it tight.

### 5. 🚫 Poor Formatting
Inconsistent fonts, misaligned text, and cramped layouts make your resume look unprofessional.

### 6. 🚫 Missing Keywords
If the job asks for "project management" and you write "supervised projects," the ATS might not match you.

### 7. 🚫 Including Irrelevant Experience
Your summer job from 15 years ago doesn't belong on your Senior Engineer resume.

### 8. 🚫 No Contact Information
Sounds basic, but it happens more than you think. Always include email, phone, and LinkedIn.

### 9. 🚫 Using an Unprofessional Email
yourboss\_hater420@gmail.com won't get callbacks. Create a professional email address.

### 10. 🚫 Not Tailoring for Each Job
A one-size-fits-all resume fits no one perfectly.

### The Solution

Use ResumeAI's job tailoring feature. Paste any job description and our AI automatically optimizes your resume to match.`,
    },
    "ats-optimization-guide": {
        title: "ATS Optimization: Beat the Bots and Get Noticed",
        category: "ATS Guide",
        readTime: "10 min read",
        date: "February 5, 2026",
        content: `## Understanding ATS Systems

Applicant Tracking Systems (ATS) are software that companies use to manage job applications. Over 98% of Fortune 500 companies use them, and they automatically filter out 75% of resumes before a human ever sees them.

### How ATS Works

1. **Parsing**: The ATS extracts text from your resume
2. **Keyword Matching**: It compares your content against the job description
3. **Scoring**: Your resume gets a relevance score
4. **Ranking**: Resumes are ranked by score for recruiter review

### ATS-Friendly Formatting Rules

- Use standard fonts (Arial, Calibri, Times New Roman)
- Avoid headers/footers — ATS often can't read them
- Don't use images or graphics for important information
- Stick to standard section headings
- Use .docx or .pdf format
- Avoid columns and tables

### Keyword Strategy

The key to ATS optimization is strategic keyword placement:

1. **Extract keywords** from the job description
2. **Include exact phrases** — don't paraphrase
3. **Place keywords naturally** in context
4. **Use both spelled-out and abbreviated forms** (e.g., "Search Engine Optimization (SEO)")

### Our ATS Score Checker

ResumeAI includes a built-in ATS Score Checker that analyzes your resume against a job description and gives you an optimization score with specific improvement suggestions.`,
    },
    "cover-letter-guide": {
        title: "The Ultimate Cover Letter Guide for 2026",
        category: "Cover Letter",
        readTime: "7 min read",
        date: "February 3, 2026",
        content: `## Why Cover Letters Still Matter

Despite rumors of their death, 83% of hiring managers say cover letters are important in their hiring decisions.

### The Perfect Structure

**Paragraph 1: The Hook**
Open with something specific about the company or role. Show you've done your research.

**Paragraph 2: Your Value**
Connect your experience directly to their needs. Use 2-3 specific achievements.

**Paragraph 3: The Close**
Express genuine enthusiasm and include a clear call to action.

### Tips for Success

- Keep it under 300 words
- Customize for every application
- Show personality while staying professional
- Address the hiring manager by name when possible

Use ResumeAI's Cover Letter Generator to create tailored cover letters that complement your resume perfectly.`,
    },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = articles[slug];

    if (!article) {
        return (
            <div className="blog-post-page">
                <div className="container-narrow" style={{ paddingTop: "120px", textAlign: "center" }}>
                    <h1>Article Not Found</h1>
                    <p style={{ color: "var(--text-secondary)", margin: "var(--space-lg) 0" }}>
                        This article doesn&apos;t exist yet.
                    </p>
                    <Link href="/blog" className="btn btn-primary">
                        <HiOutlineArrowLeft /> Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-post-page">
            <div className="container-narrow">
                <Link href="/blog" className="blog-back-link">
                    <HiOutlineArrowLeft /> Back to Blog
                </Link>

                <article className="blog-article">
                    <div className="blog-article-header">
                        <span className="blog-card-category">{article.category}</span>
                        <h1 className="blog-article-title">{article.title}</h1>
                        <div className="blog-article-meta">
                            <span><HiOutlineClock /> {article.readTime}</span>
                            <span>{article.date}</span>
                        </div>
                    </div>

                    <div className="blog-article-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }} />

                    <div className="blog-article-cta glass-card">
                        <HiOutlineSparkles style={{ fontSize: "28px", color: "var(--accent-secondary)" }} />
                        <h3>Ready to build your resume?</h3>
                        <Link href="/builder" className="btn btn-primary">
                            <HiOutlineSparkles /> Create Resume with AI
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}

function markdownToHtml(md: string): string {
    return md
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^\*\*(.*)\*\*$/gm, '<p><strong>$1</strong></p>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
        .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[hulo])/gm, (match) => match ? `<p>${match}` : '')
        .replace(/<p><(h[23]|ul|li|p|strong)/g, '<$1')
        .replace(/<\/(h[23]|ul|li)><\/p>/g, '</$1>');
}
