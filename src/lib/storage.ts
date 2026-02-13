// Resume storage using localStorage (ready for Supabase migration)

export interface SavedResume {
    id: string;
    userId: string;
    name: string;
    template: string;
    data: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    views: number;
    downloads: number;
    isPublic: boolean;
    publicSlug?: string;
    atsScore?: number;
}

const STORAGE_KEY = "resumeai_resumes";

function getAll(): SavedResume[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
}

function saveAll(resumes: SavedResume[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
}

export function getUserResumes(userId: string): SavedResume[] {
    return getAll().filter((r) => r.userId === userId).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getResumeById(id: string): SavedResume | null {
    return getAll().find((r) => r.id === id) || null;
}

export function getResumeBySlug(slug: string): SavedResume | null {
    return getAll().find((r) => r.publicSlug === slug && r.isPublic) || null;
}

export function saveResume(resume: Omit<SavedResume, "id" | "createdAt" | "updatedAt" | "views" | "downloads">): SavedResume {
    const all = getAll();
    const newResume: SavedResume = {
        ...resume,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        downloads: 0,
    };
    all.push(newResume);
    saveAll(all);
    return newResume;
}

export function updateResume(id: string, updates: Partial<SavedResume>): SavedResume | null {
    const all = getAll();
    const idx = all.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
    saveAll(all);
    return all[idx];
}

export function deleteResume(id: string): boolean {
    const all = getAll();
    const filtered = all.filter((r) => r.id !== id);
    if (filtered.length === all.length) return false;
    saveAll(filtered);
    return true;
}

export function duplicateResume(id: string): SavedResume | null {
    const resume = getResumeById(id);
    if (!resume) return null;
    return saveResume({
        userId: resume.userId,
        name: `${resume.name} (Copy)`,
        template: resume.template,
        data: { ...resume.data },
        isPublic: false,
    });
}

export function incrementViews(id: string) {
    const all = getAll();
    const idx = all.findIndex((r) => r.id === id);
    if (idx !== -1) {
        all[idx].views++;
        saveAll(all);
    }
}

export function incrementDownloads(id: string) {
    const all = getAll();
    const idx = all.findIndex((r) => r.id === id);
    if (idx !== -1) {
        all[idx].downloads++;
        saveAll(all);
    }
}

export function togglePublic(id: string): SavedResume | null {
    const resume = getResumeById(id);
    if (!resume) return null;
    const slug = resume.isPublic ? undefined : generateSlug(resume.name);
    return updateResume(id, { isPublic: !resume.isPublic, publicSlug: slug });
}

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        + "-" + Math.random().toString(36).slice(2, 8);
}

// Cover letter storage
export interface SavedCoverLetter {
    id: string;
    userId: string;
    name: string;
    company: string;
    position: string;
    content: string;
    createdAt: string;
}

const CL_KEY = "resumeai_coverletters";

export function getUserCoverLetters(userId: string): SavedCoverLetter[] {
    try {
        const all: SavedCoverLetter[] = JSON.parse(localStorage.getItem(CL_KEY) || "[]");
        return all.filter((c) => c.userId === userId);
    } catch {
        return [];
    }
}

export function saveCoverLetter(cl: Omit<SavedCoverLetter, "id" | "createdAt">): SavedCoverLetter {
    const all: SavedCoverLetter[] = JSON.parse(localStorage.getItem(CL_KEY) || "[]");
    const newCL: SavedCoverLetter = {
        ...cl,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    all.push(newCL);
    localStorage.setItem(CL_KEY, JSON.stringify(all));
    return newCL;
}
