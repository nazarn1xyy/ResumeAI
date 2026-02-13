
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { name, position, company, jobDescription } = await req.json();

        const prompt = `Write a professional cover letter for ${name} applying for the position of ${position} at ${company}.
    Job Description: "${jobDescription.substring(0, 500)}..."
    Keep it concise, engaging, and highlight relevant skills. 
    Structure: Opening, 2 Body Paragraphs, Closing.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const letter = response.text().trim();

        return NextResponse.json({ result: letter });
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
    }
}
