import Link from "next/link";
import { HiOutlineSparkles, HiOutlineClock, HiOutlineArrowRight } from "react-icons/hi2";

const blogPosts = [
    {
        slug: "how-to-write-resume-2026",
        title: "How to Write a Perfect Resume in 2026",
        excerpt: "Learn the latest resume trends, ATS-optimization techniques, and what recruiters actually look for in a modern resume.",
        category: "Resume Tips",
        readTime: "8 min read",
        date: "Feb 10, 2026",
        featured: true,
    },
    {
        slug: "top-resume-mistakes",
        title: "10 Resume Mistakes That Cost You the Interview",
        excerpt: "Avoid these common resume pitfalls that instantly disqualify candidates. From formatting errors to missing keywords.",
        category: "Career Advice",
        readTime: "6 min read",
        date: "Feb 8, 2026",
        featured: true,
    },
    {
        slug: "ats-optimization-guide",
        title: "ATS Optimization: Beat the Bots and Get Noticed",
        excerpt: "Understanding how Applicant Tracking Systems work and how to format your resume to pass automated screening.",
        category: "ATS Guide",
        readTime: "10 min read",
        date: "Feb 5, 2026",
        featured: true,
    },
    {
        slug: "cover-letter-guide",
        title: "The Ultimate Cover Letter Guide for 2026",
        excerpt: "Craft compelling cover letters that complement your resume and make hiring managers eager to meet you.",
        category: "Cover Letter",
        readTime: "7 min read",
        date: "Feb 3, 2026",
        featured: false,
    },
    {
        slug: "ai-resume-building",
        title: "How AI is Revolutionizing Resume Building",
        excerpt: "Discover how AI tools can help you create better resumes faster, with smarter content and perfect formatting.",
        category: "Technology",
        readTime: "5 min read",
        date: "Jan 28, 2026",
        featured: false,
    },
    {
        slug: "career-change-resume",
        title: "How to Write a Resume for a Career Change",
        excerpt: "Transitioning to a new field? Learn how to highlight transferable skills and frame your experience effectively.",
        category: "Career Advice",
        readTime: "9 min read",
        date: "Jan 22, 2026",
        featured: false,
    },
    {
        slug: "remote-job-resume",
        title: "Optimizing Your Resume for Remote Positions",
        excerpt: "Remote work requires different skills emphasis. Learn what remote employers look for and how to showcase it.",
        category: "Resume Tips",
        readTime: "6 min read",
        date: "Jan 18, 2026",
        featured: false,
    },
    {
        slug: "interview-preparation",
        title: "From Resume to Interview: Complete Preparation Guide",
        excerpt: "Your resume got you the interview — now what? A comprehensive guide to preparing for technical and behavioral interviews.",
        category: "Interview Prep",
        readTime: "12 min read",
        date: "Jan 14, 2026",
        featured: false,
    },
];

export default function BlogPage() {
    const featured = blogPosts.filter((p) => p.featured);
    const rest = blogPosts.filter((p) => !p.featured);

    return (
        <div className="blog-page">
            <div className="container">
                <div className="blog-header">
                    <h1 className="section-title" style={{ textAlign: "left" }}>
                        Career Blog
                    </h1>
                    <p className="section-subtitle" style={{ textAlign: "left", margin: 0, maxWidth: "none" }}>
                        Expert tips on resumes, cover letters, interviews, and career growth
                    </p>
                </div>

                {/* Featured Posts */}
                <div className="blog-featured-grid">
                    {featured.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card blog-card featured">
                            <div className="blog-card-category">{post.category}</div>
                            <h2 className="blog-card-title">{post.title}</h2>
                            <p className="blog-card-excerpt">{post.excerpt}</p>
                            <div className="blog-card-meta">
                                <span><HiOutlineClock /> {post.readTime}</span>
                                <span>{post.date}</span>
                            </div>
                            <span className="blog-card-cta">
                                Read Article <HiOutlineArrowRight />
                            </span>
                        </Link>
                    ))}
                </div>

                {/* All Posts */}
                <h2 style={{ fontSize: "var(--text-2xl)", fontFamily: "var(--font-display)", margin: "var(--space-3xl) 0 var(--space-lg)" }}>
                    All Articles
                </h2>
                <div className="blog-grid">
                    {rest.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card blog-card">
                            <div className="blog-card-category">{post.category}</div>
                            <h3 className="blog-card-title">{post.title}</h3>
                            <p className="blog-card-excerpt">{post.excerpt}</p>
                            <div className="blog-card-meta">
                                <span><HiOutlineClock /> {post.readTime}</span>
                                <span>{post.date}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="blog-cta glass-card">
                    <HiOutlineSparkles style={{ fontSize: "32px", color: "var(--accent-secondary)" }} />
                    <h3>Ready to Build Your Resume?</h3>
                    <p>Put these tips into action with our AI-powered resume builder.</p>
                    <Link href="/builder" className="btn btn-primary">
                        <HiOutlineSparkles /> Create Your Resume
                    </Link>
                </div>
            </div>
        </div>
    );
}
