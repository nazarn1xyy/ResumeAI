
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { name, jobTitle, experience } = await req.json();

        const prompt = `Generate a professional resume summary (3-4 sentences) for ${name}, a ${jobTitle}. 
    Key experience highlights: ${JSON.stringify(experience)}. 
    Focus on achievements, skills, and value proposition. Do not use "I" too much, use professional voice.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text().trim();

        return NextResponse.json({ result: summary });
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
    }
}
