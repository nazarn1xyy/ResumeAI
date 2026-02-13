
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { jobTitle } = await req.json();

        const prompt = `Suggest key professional skills (10-15 skills) for a ${jobTitle}. Return only a JSON array of strings. Example: ["Skill1", "Skill2"].`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown code blocks if present
        if (text.startsWith("```json")) text = text.replace("```json", "").replace("```", "");
        else if (text.startsWith("```")) text = text.replace("```", "").replace("```", "");

        const skills = JSON.parse(text);

        return NextResponse.json({ result: skills });
    } catch (error) {
        console.error("AI Skill Suggestion error:", error);
        // Fallback to default
        return NextResponse.json({ result: ["Communication", "Leadership", "Problem Solving"] });
    }
}
