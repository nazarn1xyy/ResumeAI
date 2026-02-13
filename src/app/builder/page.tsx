"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    HiOutlineSparkles,
    HiOutlineUser,
    HiOutlineBriefcase,
    HiOutlineAcademicCap,
    HiOutlineWrenchScrewdriver,
    HiOutlineArrowDownTray,
    HiOutlinePlus,
    HiOutlineTrash,
    HiOutlineCloudArrowUp,
} from "react-icons/hi2";
import { enhanceResumeBullet, generateResumeSummary, suggestSkills } from "@/lib/ai";
import { exportResumeToPDF } from "@/lib/pdf";
import { useAuth } from "@/lib/auth";
import { getResumeById, saveResume, updateResume } from "@/lib/storage";

interface Experience {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Education {
    id: string;
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
}

interface ResumeData {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
}

const initialData: ResumeData = {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    experience: [
        {
            id: "1",
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
        },
    ],
    education: [
        {
            id: "1",
            degree: "",
            school: "",
            startDate: "",
            endDate: "",
        },
    ],
    skills: [],
};

type TemplateType = "modern" | "classic" | "creative";

function BuilderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    const resumeId = searchParams.get("id");

    const [data, setData] = useState<ResumeData>(initialData);
    const [template, setTemplate] = useState<TemplateType>("modern");
    const [aiLoading, setAiLoading] = useState<string | null>(null);
    const [skillInput, setSkillInput] = useState("");
    const [exporting, setExporting] = useState(false);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Load resume data if ID is present
    useEffect(() => {
        if (resumeId) {
            const saved = getResumeById(resumeId);
            if (saved) {
                setData(saved.data as unknown as ResumeData);
                setTemplate(saved.template as TemplateType);
                setLastSaved(new Date(saved.updatedAt));
            }
        }
    }, [resumeId]);

    // Save resume
    const handleSave = async () => {
        if (!user) {
            alert("Please sign in to save your resume.");
            return;
        }
        setSaving(true);
        try {
            // Simulate network delay
            await new Promise(r => setTimeout(r, 500));

            if (resumeId) {
                updateResume(resumeId, {
                    name: data.jobTitle || "Untitled Resume",
                    template,
                    data: data as unknown as Record<string, unknown>,
                });
            } else {
                const newResume = saveResume({
                    userId: user.id,
                    name: data.jobTitle || "Untitled Resume",
                    template,
                    data: data as unknown as Record<string, unknown>,
                    isPublic: false,
                });
                router.replace(`/builder?id=${newResume.id}`);
            }
            setLastSaved(new Date());
        } finally {
            setSaving(false);
        }
    };

    const updateField = useCallback(
        (field: keyof ResumeData, value: string | string[]) => {
            setData((prev) => ({ ...prev, [field]: value }));
        },
        []
    );

    const updateExperience = useCallback(
        (id: string, field: keyof Experience, value: string) => {
            setData((prev) => ({
                ...prev,
                experience: prev.experience.map((exp) =>
                    exp.id === id ? { ...exp, [field]: value } : exp
                ),
            }));
        },
        []
    );

    const updateEducation = useCallback(
        (id: string, field: keyof Education, value: string) => {
            setData((prev) => ({
                ...prev,
                education: prev.education.map((edu) =>
                    edu.id === id ? { ...edu, [field]: value } : edu
                ),
            }));
        },
        []
    );

    const addExperience = () => {
        setData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    id: Date.now().toString(),
                    title: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
        }));
    };

    const removeExperience = (id: string) => {
        setData((prev) => ({
            ...prev,
            experience: prev.experience.filter((exp) => exp.id !== id),
        }));
    };

    const addEducation = () => {
        setData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    id: Date.now().toString(),
                    degree: "",
                    school: "",
                    startDate: "",
                    endDate: "",
                },
            ],
        }));
    };

    const removeEducation = (id: string) => {
        setData((prev) => ({
            ...prev,
            education: prev.education.filter((edu) => edu.id !== id),
        }));
    };

    const addSkill = () => {
        if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
            setData((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
            setSkillInput("");
        }
    };

    const removeSkill = (skill: string) => {
        setData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    const handleEnhanceBullet = async (expId: string) => {
        setAiLoading(`bullet-${expId}`);
        try {
            const exp = data.experience.find((e) => e.id === expId);
            const enhanced = await enhanceResumeBullet(exp?.description || "");
            updateExperience(expId, "description", enhanced);
        } finally {
            setAiLoading(null);
        }
    };

    const handleGenerateSummary = async () => {
        setAiLoading("summary");
        try {
            const summary = await generateResumeSummary(
                data.fullName,
                data.jobTitle,
                data.experience.map((e) => e.description)
            );
            updateField("summary", summary);
        } finally {
            setAiLoading(null);
        }
    };

    const handleSuggestSkills = async () => {
        setAiLoading("skills");
        try {
            const skills = await suggestSkills(data.jobTitle);
            setData((prev) => ({
                ...prev,
                skills: [...new Set([...prev.skills, ...skills])],
            }));
        } finally {
            setAiLoading(null);
        }
    };

    const handleExportPDF = async () => {
        setExporting(true);
        try {
            await exportResumeToPDF(
                "resume-preview",
                `${data.fullName || "resume"}.pdf`
            );
        } catch (err) {
            console.error("PDF export failed:", err);
        } finally {
            setExporting(false);
        }
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    // Render Resume Preview based on template
    const renderResumePreview = () => {
        const name = data.fullName || "Your Name";
        const title = data.jobTitle || "Job Title";
        const email = data.email || "email@example.com";
        const phone = data.phone || "+1 (555) 000-0000";
        const location = data.location || "City, Country";

        if (template === "creative") {
            return (
                <div className="resume-creative">
                    <div className="resume-sidebar">
                        <div className="resume-name">{name}</div>
                        <div className="resume-jobtitle">{title}</div>

                        <div className="sidebar-section">
                            <div className="sidebar-title">Contact</div>
                            <div className="contact-item">{email}</div>
                            <div className="contact-item">{phone}</div>
                            <div className="contact-item">{location}</div>
                            {data.linkedin && (
                                <div className="contact-item">{data.linkedin}</div>
                            )}
                        </div>

                        {data.skills.length > 0 && (
                            <div className="sidebar-section">
                                <div className="sidebar-title">Skills</div>
                                <div>
                                    {data.skills.map((skill) => (
                                        <span key={skill} className="resume-skill-tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.education.some((e) => e.degree || e.school) && (
                            <div className="sidebar-section">
                                <div className="sidebar-title">Education</div>
                                {data.education.map(
                                    (edu) =>
                                        (edu.degree || edu.school) && (
                                            <div key={edu.id} style={{ marginBottom: "10px" }}>
                                                <div
                                                    style={{
                                                        fontSize: "10px",
                                                        fontWeight: 600,
                                                        color: "white",
                                                    }}
                                                >
                                                    {edu.degree}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "9px",
                                                        color: "rgba(255,255,255,0.7)",
                                                    }}
                                                >
                                                    {edu.school}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "8px",
                                                        color: "rgba(255,255,255,0.5)",
                                                    }}
                                                >
                                                    {edu.startDate}
                                                    {edu.endDate ? ` — ${edu.endDate}` : ""}
                                                </div>
                                            </div>
                                        )
                                )}
                            </div>
                        )}
                    </div>
                    <div className="resume-main">
                        {data.summary && (
                            <div className="resume-section">
                                <div className="resume-section-title">Profile</div>
                                <p className="resume-summary">{data.summary}</p>
                            </div>
                        )}
                        {data.experience.some((e) => e.title || e.company) && (
                            <div className="resume-section">
                                <div className="resume-section-title">Experience</div>
                                {data.experience.map(
                                    (exp) =>
                                        (exp.title || exp.company) && (
                                            <div key={exp.id} className="resume-entry">
                                                <div className="resume-entry-header">
                                                    <span className="resume-entry-title">
                                                        {exp.title}
                                                    </span>
                                                    <span className="resume-entry-date">
                                                        {exp.startDate}
                                                        {exp.endDate ? ` — ${exp.endDate}` : ""}
                                                    </span>
                                                </div>
                                                <div className="resume-entry-subtitle">
                                                    {exp.company}
                                                </div>
                                                {exp.description && (
                                                    <p className="resume-entry-desc">{exp.description}</p>
                                                )}
                                            </div>
                                        )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        const templateClass =
            template === "classic" ? "resume-classic" : "resume-modern";

        return (
            <div className={templateClass}>
                <div className="resume-header">
                    <div>
                        <div className="resume-name">{name}</div>
                        <div className="resume-jobtitle">{title}</div>
                        {template === "classic" && (
                            <div className="resume-contact">
                                <span>{email}</span>
                                <span>{phone}</span>
                                <span>{location}</span>
                            </div>
                        )}
                    </div>
                    {template === "modern" && (
                        <div className="resume-contact">
                            <div>{email}</div>
                            <div>{phone}</div>
                            <div>{location}</div>
                            {data.linkedin && <div>{data.linkedin}</div>}
                        </div>
                    )}
                </div>

                {data.summary && (
                    <div className="resume-section">
                        <div className="resume-section-title">Professional Summary</div>
                        <p className="resume-summary">{data.summary}</p>
                    </div>
                )}

                {data.experience.some((e) => e.title || e.company) && (
                    <div className="resume-section">
                        <div className="resume-section-title">Experience</div>
                        {data.experience.map(
                            (exp) =>
                                (exp.title || exp.company) && (
                                    <div key={exp.id} className="resume-entry">
                                        <div className="resume-entry-header">
                                            <span className="resume-entry-title">{exp.title}</span>
                                            <span className="resume-entry-date">
                                                {exp.startDate}
                                                {exp.endDate ? ` — ${exp.endDate}` : ""}
                                            </span>
                                        </div>
                                        <div className="resume-entry-subtitle">{exp.company}</div>
                                        {exp.description && (
                                            <p className="resume-entry-desc">{exp.description}</p>
                                        )}
                                    </div>
                                )
                        )}
                    </div>
                )}

                {data.education.some((e) => e.degree || e.school) && (
                    <div className="resume-section">
                        <div className="resume-section-title">Education</div>
                        {data.education.map(
                            (edu) =>
                                (edu.degree || edu.school) && (
                                    <div key={edu.id} className="resume-entry">
                                        <div className="resume-entry-header">
                                            <span className="resume-entry-title">{edu.degree}</span>
                                            <span className="resume-entry-date">
                                                {edu.startDate}
                                                {edu.endDate ? ` — ${edu.endDate}` : ""}
                                            </span>
                                        </div>
                                        <div className="resume-entry-subtitle">{edu.school}</div>
                                    </div>
                                )
                        )}
                    </div>
                )}

                {data.skills.length > 0 && (
                    <div className="resume-section">
                        <div className="resume-section-title">Skills</div>
                        <div className="resume-skills">
                            {data.skills.map((skill) => (
                                <span key={skill} className="resume-skill-tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="builder-page">
            {/* LEFT SIDEBAR — FORM */}
            <div className="builder-sidebar">
                <div className="builder-header">
                    <h1 className="builder-title">Resume Builder</h1>
                    <div className="builder-actions">
                        {user && (
                            <div className="save-status">
                                {saving ? (
                                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Saving...</span>
                                ) : lastSaved ? (
                                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                                        Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                ) : null}
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={handleSave}
                                    disabled={saving}
                                    title="Save Resume"
                                >
                                    <HiOutlineCloudArrowUp />
                                    <span className="btn-text-mobile">Save</span>
                                </button>
                            </div>
                        )}
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleExportPDF}
                            disabled={exporting}
                        >
                            {exporting ? (
                                <span className="loader" />
                            ) : (
                                <HiOutlineArrowDownTray />
                            )}
                            {exporting ? "Exporting..." : "Export PDF"}
                        </button>
                    </div>
                </div>

                {/* Template Selector */}
                <div className="form-section">
                    <div className="form-section-title" style={{ marginBottom: "var(--space-md)" }}>
                        <HiOutlineSparkles className="icon" />
                        Choose Template
                    </div>
                    <div className="template-selector">
                        {(["modern", "classic", "creative"] as TemplateType[]).map((t) => (
                            <button
                                key={t}
                                className={`template-option ${template === t ? "active" : ""}`}
                                onClick={() => setTemplate(t)}
                            >
                                <div className="template-preview-mini">
                                    <div
                                        className="mini-header"
                                        style={{
                                            background:
                                                t === "modern"
                                                    ? "#ffffff"
                                                    : t === "creative"
                                                        ? "linear-gradient(135deg, #ffffff, #808080)"
                                                        : "#333",
                                        }}
                                    />
                                    <div className="mini-line" />
                                    <div className="mini-line short" />
                                    <div className="mini-line" />
                                    <div className="mini-line short" />
                                </div>
                                <div className="template-option-name">
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Personal Info */}
                <div className="form-section">
                    <div className="form-section-header">
                        <div className="form-section-title">
                            <HiOutlineUser className="icon" />
                            Personal Information
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    className="input-field"
                                    placeholder="John Doe"
                                    value={data.fullName}
                                    onChange={(e) => updateField("fullName", e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Job Title</label>
                                <input
                                    className="input-field"
                                    placeholder="Software Engineer"
                                    value={data.jobTitle}
                                    onChange={(e) => updateField("jobTitle", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    className="input-field"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={data.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Phone</label>
                                <input
                                    className="input-field"
                                    placeholder="+1 (555) 123-4567"
                                    value={data.phone}
                                    onChange={(e) => updateField("phone", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Location</label>
                                <input
                                    className="input-field"
                                    placeholder="City, Country"
                                    value={data.location}
                                    onChange={(e) => updateField("location", e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>LinkedIn (optional)</label>
                                <input
                                    className="input-field"
                                    placeholder="linkedin.com/in/johndoe"
                                    value={data.linkedin}
                                    onChange={(e) => updateField("linkedin", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="form-section">
                    <div className="form-section-header">
                        <div className="form-section-title">
                            <HiOutlineSparkles className="icon" />
                            Professional Summary
                        </div>
                        <button
                            className={`ai-btn ${aiLoading === "summary" ? "loading" : ""}`}
                            onClick={handleGenerateSummary}
                            disabled={aiLoading === "summary"}
                        >
                            {aiLoading === "summary" ? (
                                <span className="loader" style={{ width: 12, height: 12 }} />
                            ) : (
                                <HiOutlineSparkles className="ai-sparkle" />
                            )}
                            AI Generate
                        </button>
                    </div>
                    <textarea
                        className="input-field"
                        placeholder="Brief professional summary... or click AI Generate"
                        value={data.summary}
                        onChange={(e) => updateField("summary", e.target.value)}
                        rows={4}
                    />
                </div>

                {/* Experience */}
                <div className="form-section">
                    <div className="form-section-header">
                        <div className="form-section-title">
                            <HiOutlineBriefcase className="icon" />
                            Experience
                        </div>
                    </div>
                    {data.experience.map((exp, idx) => (
                        <div key={exp.id} className="entry-card">
                            <div className="entry-card-header">
                                <span className="entry-card-title">Position {idx + 1}</span>
                                {data.experience.length > 1 && (
                                    <button
                                        className="remove-entry"
                                        onClick={() => removeExperience(exp.id)}
                                    >
                                        <HiOutlineTrash />
                                    </button>
                                )}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--space-sm)",
                                }}
                            >
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Job Title</label>
                                        <input
                                            className="input-field"
                                            placeholder="Software Engineer"
                                            value={exp.title}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "title", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Company</label>
                                        <input
                                            className="input-field"
                                            placeholder="Google"
                                            value={exp.company}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "company", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Start Date</label>
                                        <input
                                            className="input-field"
                                            placeholder="Jan 2022"
                                            value={exp.startDate}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "startDate", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>End Date</label>
                                        <input
                                            className="input-field"
                                            placeholder="Present"
                                            value={exp.endDate}
                                            onChange={(e) =>
                                                updateExperience(exp.id, "endDate", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <label>Description</label>
                                        <button
                                            className={`ai-btn ${aiLoading === `bullet-${exp.id}` ? "loading" : ""}`}
                                            onClick={() => handleEnhanceBullet(exp.id)}
                                            disabled={aiLoading === `bullet-${exp.id}`}
                                        >
                                            {aiLoading === `bullet-${exp.id}` ? (
                                                <span
                                                    className="loader"
                                                    style={{ width: 12, height: 12 }}
                                                />
                                            ) : (
                                                <HiOutlineSparkles />
                                            )}
                                            Enhance with AI
                                        </button>
                                    </div>
                                    <textarea
                                        className="input-field"
                                        placeholder="Describe your responsibilities and achievements..."
                                        value={exp.description}
                                        onChange={(e) =>
                                            updateExperience(exp.id, "description", e.target.value)
                                        }
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="add-entry-btn" onClick={addExperience}>
                        <HiOutlinePlus /> Add Experience
                    </button>
                </div>

                {/* Education */}
                <div className="form-section">
                    <div className="form-section-header">
                        <div className="form-section-title">
                            <HiOutlineAcademicCap className="icon" />
                            Education
                        </div>
                    </div>
                    {data.education.map((edu, idx) => (
                        <div key={edu.id} className="entry-card">
                            <div className="entry-card-header">
                                <span className="entry-card-title">Education {idx + 1}</span>
                                {data.education.length > 1 && (
                                    <button
                                        className="remove-entry"
                                        onClick={() => removeEducation(edu.id)}
                                    >
                                        <HiOutlineTrash />
                                    </button>
                                )}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--space-sm)",
                                }}
                            >
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Degree</label>
                                        <input
                                            className="input-field"
                                            placeholder="Bachelor of Science in CS"
                                            value={edu.degree}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "degree", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>School / University</label>
                                        <input
                                            className="input-field"
                                            placeholder="MIT"
                                            value={edu.school}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "school", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Start Date</label>
                                        <input
                                            className="input-field"
                                            placeholder="Sep 2018"
                                            value={edu.startDate}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "startDate", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>End Date</label>
                                        <input
                                            className="input-field"
                                            placeholder="Jun 2022"
                                            value={edu.endDate}
                                            onChange={(e) =>
                                                updateEducation(edu.id, "endDate", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className="add-entry-btn" onClick={addEducation}>
                        <HiOutlinePlus /> Add Education
                    </button>
                </div>

                {/* Skills */}
                <div className="form-section">
                    <div className="form-section-header">
                        <div className="form-section-title">
                            <HiOutlineWrenchScrewdriver className="icon" />
                            Skills
                        </div>
                        <button
                            className={`ai-btn ${aiLoading === "skills" ? "loading" : ""}`}
                            onClick={handleSuggestSkills}
                            disabled={aiLoading === "skills"}
                        >
                            {aiLoading === "skills" ? (
                                <span className="loader" style={{ width: 12, height: 12 }} />
                            ) : (
                                <HiOutlineSparkles />
                            )}
                            AI Suggest
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "var(--space-sm)",
                            marginBottom: "var(--space-md)",
                        }}
                    >
                        <input
                            className="input-field"
                            placeholder="Type a skill and press Enter"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleSkillKeyDown}
                        />
                        <button className="btn btn-secondary btn-sm" onClick={addSkill}>
                            <HiOutlinePlus />
                        </button>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
                        {data.skills.map((skill) => (
                            <span
                                key={skill}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "4px 12px",
                                    background: "var(--bg-glass-strong)",
                                    border: "1px solid var(--border-color)",
                                    borderRadius: "var(--radius-full)",
                                    fontSize: "var(--text-xs)",
                                    color: "var(--accent-secondary)",
                                }}
                            >
                                {skill}
                                <button
                                    onClick={() => removeSkill(skill)}
                                    style={{
                                        color: "var(--text-muted)",
                                        fontSize: "12px",
                                        padding: "0 2px",
                                        lineHeight: 1,
                                    }}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT — PREVIEW */}
            <div className="builder-preview">
                <div className="builder-preview-inner" id="resume-preview">
                    {renderResumePreview()}
                </div>
            </div>
        </div>
    );
}

export default function BuilderPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading builder...</div>}>
            <BuilderContent />
        </Suspense>
    );
}
