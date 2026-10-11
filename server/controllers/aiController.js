
import OpenAI from "openai";
import Startup from "../models/Startup.js";

const ai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateStartupPitch = async (req, res) => {
  try {
    const { startupId } = req.params;

    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        message: "Startup not found",
      });
    }

    const fundingINR = `₹${Number(
      startup.fundingRequired
    ).toLocaleString("en-IN")}`;

    const prompt = `
You are an experienced startup pitch advisor.

Create a concise, professional investor pitch using only the
startup information below.

STARTUP INFORMATION
Name: ${startup.name}
Industry: ${startup.industry}
Tagline: ${startup.tagline || "Not provided"}
Description: ${startup.description}
Funding Required: ${fundingINR} INR
Location: ${startup.location || "Not provided"}

Use these five sections:

## 1. Problem
Explain the problem this startup aims to solve.

## 2. Solution
Explain how the startup addresses the problem.

## 3. Target Market
Describe likely customers based on the available information.

## 4. Investment Highlights
Highlight potential strengths without inventing facts.

## 5. Short Investor Pitch
Write a concise pitch suitable for introducing the startup to investors.

Rules:
- Return the actual pitch, not a safety assessment.
- Do not invent revenue, traction, customer counts, or financial results.
- Do not invent a use of funds unless the startup information provides it.
- Express the funding amount in INR; never convert it to USD.
- Clearly identify missing information when relevant.
- Use professional English and Markdown headings.
`;

    const response = await ai.chat.completions.create(
      {
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content:
              "You are a professional startup pitch advisor. Return the requested pitch only, with all five sections.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        signal: AbortSignal.timeout(30000),
      }
    );

    const choice = response.choices?.[0];
    const pitch = choice?.message?.content?.trim();

    console.log("AI model:", response.model);
    console.log("AI finish reason:", choice?.finish_reason);

    if (
      !pitch ||
      pitch.length < 100 ||
      /user safety:\s*safe/i.test(pitch)
    ) {
      console.error("AI returned an invalid or incomplete pitch.");

      return res.status(502).json({
        message: "AI returned an invalid pitch. Please try again.",
      });
    }

    return res.status(200).json({
      message: "Startup pitch generated successfully",
      startup: startup.name,
      pitch,
    });
  } catch (error) {
    console.error(
      "AI pitch generation failed:",
      error.status || "",
      error.message
    );

    if (
      error.name === "TimeoutError" ||
      error.name === "AbortError"
    ) {
      return res.status(504).json({
        message: "AI request timed out. Please try again.",
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        message: "AI request limit reached. Please try again later.",
      });
    }

    return res.status(502).json({
      message: "AI service is temporarily unavailable. Please try again.",
    });
  }
};
