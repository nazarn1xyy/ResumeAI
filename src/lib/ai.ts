// AI Helper Functions
// Works in mock mode by default; ready to connect to OpenAI/Gemini via env vars

const USE_REAL_AI = true; // Enabled real AI

// Simulated delay to mimic API call
const simulateDelay = (ms: number = 1500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

// Mock AI responses for resume bullet enhancement
const bulletEnhancements: Record<string, string[]> = {
    default: [
        "Led cross-functional team initiatives resulting in a 25% increase in operational efficiency",
        "Designed and implemented scalable solutions that reduced processing time by 40%",
        "Mentored junior team members, improving team productivity and knowledge sharing",
        "Collaborated with stakeholders to define project requirements and deliver solutions on time and within budget",
        "Spearheaded the adoption of new technologies, resulting in improved system performance and reliability",
    ],
};

// Mock cover letter paragraphs
const coverLetterTemplates = {
    opening: [
        "I am writing to express my strong interest in the {position} position at {company}. With my background in {field} and a proven track record of delivering impactful results, I am confident that I would be a valuable addition to your team.",
        "I am excited to apply for the {position} role at {company}. My experience in {field} has equipped me with the skills and perspective needed to contribute meaningfully to your organization's goals.",
    ],
    body: [
        "Throughout my career, I have developed deep expertise in driving results through strategic thinking and hands-on execution. In my current role, I have successfully led initiatives that improved key metrics and strengthened team performance. My collaborative approach and attention to detail have consistently been recognized by leadership.",
        "I bring a unique combination of technical expertise and leadership skills that align well with this role. I have a strong record of identifying opportunities for improvement and implementing solutions that deliver measurable outcomes. My ability to work effectively across teams and communicate complex ideas clearly has been instrumental in my success.",
    ],
    closing: [
        "I would welcome the opportunity to discuss how my experience and skills can contribute to {company}'s continued success. Thank you for considering my application. I look forward to hearing from you.",
        "I am eager to bring my expertise to {company} and contribute to your team's objectives. Thank you for your time and consideration. I would be delighted to discuss my qualifications in more detail at your convenience.",
    ],
};

export async function enhanceResumeBullet(
    rawDescription: string
): Promise<string> {
    if (USE_REAL_AI) {
        try {
            const response = await fetch('/api/ai/enhance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: rawDescription }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) return data.result;
            }
        } catch (error) {
            console.error("AI Enhance error:", error);
        }
    }

    await simulateDelay(1200);

    // Return a random enhanced bullet
    const bullets = bulletEnhancements.default;
    return bullets[Math.floor(Math.random() * bullets.length)];
}

export async function generateResumeSummary(
    name: string,
    jobTitle: string,
    experience: string[]
): Promise<string> {
    if (USE_REAL_AI) {
        try {
            const response = await fetch('/api/ai/summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, jobTitle, experience }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) return data.result;
            }
        } catch (error) {
            console.error("AI Summary error:", error);
        }
    }

    await simulateDelay(1500);

    return `Results-driven ${jobTitle || "professional"} with extensive experience in delivering high-impact solutions. Proven ability to lead cross-functional teams, optimize processes, and drive business growth. Adept at leveraging data-driven insights to inform strategic decision-making. Passionate about innovation and continuous improvement.`;
}

export async function suggestSkills(jobTitle: string): Promise<string[]> {
    if (USE_REAL_AI) {
        try {
            const response = await fetch('/api/ai/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobTitle }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result && Array.isArray(data.result)) return data.result;
            }
        } catch (error) {
            console.error("AI Skill Suggestion error:", error);
        }
    }

    await simulateDelay(800);

    const skillSets: Record<string, string[]> = {
        developer: [
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Git",
            "REST APIs",
            "SQL",
            "Docker",
            "CI/CD",
            "Agile",
        ],
        designer: [
            "Figma",
            "Adobe Creative Suite",
            "UI/UX Design",
            "Prototyping",
            "Design Systems",
            "Typography",
            "Color Theory",
            "Wireframing",
            "User Research",
            "Responsive Design",
        ],
        manager: [
            "Project Management",
            "Team Leadership",
            "Strategic Planning",
            "Budget Management",
            "Stakeholder Management",
            "Risk Assessment",
            "Agile/Scrum",
            "Communication",
            "Problem Solving",
            "Decision Making",
        ],
        marketing: [
            "Digital Marketing",
            "SEO/SEM",
            "Content Strategy",
            "Google Analytics",
            "Social Media",
            "Email Marketing",
            "A/B Testing",
            "Campaign Management",
            "Brand Strategy",
            "Market Research",
        ],
        default: [
            "Communication",
            "Leadership",
            "Problem Solving",
            "Project Management",
            "Data Analysis",
            "Team Collaboration",
            "Strategic Planning",
            "Critical Thinking",
            "Time Management",
            "Adaptability",
        ],
    };

    const lowerTitle = jobTitle.toLowerCase();
    for (const [key, skills] of Object.entries(skillSets)) {
        if (lowerTitle.includes(key)) {
            return skills;
        }
    }

    return skillSets.default;
}

export async function generateCoverLetter(
    name: string,
    position: string,
    company: string,
    jobDescription: string
): Promise<string> {
    if (USE_REAL_AI) {
        try {
            const response = await fetch('/api/ai/cover-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, position, company, jobDescription }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) return data.result;
            }
        } catch (error) {
            console.error("AI Cover Letter error:", error);
        }
    }

    await simulateDelay(2000);

    const field = position.toLowerCase().includes("develop")
        ? "software development"
        : position.toLowerCase().includes("design")
            ? "design and creative solutions"
            : position.toLowerCase().includes("market")
                ? "marketing and brand strategy"
                : "my professional field";

    const opening = coverLetterTemplates.opening[
        Math.floor(Math.random() * coverLetterTemplates.opening.length)
    ]
        .replace("{position}", position || "advertised")
        .replace("{company}", company || "your company")
        .replace("{field}", field);

    const body = coverLetterTemplates.body[
        Math.floor(Math.random() * coverLetterTemplates.body.length)
    ];

    const closing = coverLetterTemplates.closing[
        Math.floor(Math.random() * coverLetterTemplates.closing.length)
    ]
        .replace("{company}", company || "your company");

    return `${opening}\n\n${body}\n\n${closing}\n\nSincerely,\n${name || "Your Name"}`;
}
