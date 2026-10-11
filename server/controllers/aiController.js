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

    const prompt = `
      You are a startup pitch advisor.

      Generate a concise, professional investor pitch
      using only the following startup information.

      Name: ${startup.name}
      Industry: ${startup.industry}
      Tagline: ${startup.tagline || "Not provided"}
      Description: ${startup.description}
      Funding Required: ${startup.fundingRequired}
      Location: ${startup.location || "Not provided"}

      Include these sections:
      1. Problem
      2. Solution
      3. Target Market
      4. Investment Highlights
      5. Short Investor Pitch

      Do not invent company metrics or financial results.
    `;

    const response = await ai.chat.completions.create(
      {
        model: "openrouter/free",
        messages: [
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

    const pitch = response.choices[0]?.message?.content;

    if (!pitch) {
      return res.status(502).json({
        message: "AI returned an empty response",
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

    if (error.name === "TimeoutError" || error.name === "AbortError") {
      return res.status(504).json({
        message: "AI request timed out. Please try again.",
      });
    }

    return res.status(error.status === 429 ? 429 : 502).json({
      message: "AI service is temporarily unavailable. Please try again.",
    });
  }
};