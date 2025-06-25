export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server";

/*                              CONFIGURATION                                */
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-4o-mini"; // Use OpenRouter's model naming

/*                                 Utils                                 */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function askOpenRouter(prompt: string, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://yourdomain.com", // Optional, but recommended
          "X-Title": "Job Tracker App",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
          max_tokens: 400,
        }),
      });

      if (res.status === 429 && attempt < maxRetries) {
        const retryAfter = res.headers.get("retry-after");
        const waitTime = retryAfter
          ? parseInt(retryAfter) * 1000
          : Math.min(Math.pow(2, attempt - 1) * 1000, 60000);

        console.log(
          `Rate limited (attempt ${attempt}/${maxRetries}), waiting ${waitTime}ms...`
        );
        await wait(waitTime);
        continue;
      }

      if (!res.ok) {
        if (attempt === maxRetries) {
          console.log(
            `OpenRouter failed after ${maxRetries} attempts with status ${res.status}`
          );
          return "";
        }
        throw new Error(`openrouter ${res.status}`);
      }

      const data = await res.json();
      return (
        (data.choices?.[0]?.message?.content as string | undefined) ?? ""
      );
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await wait(Math.pow(2, attempt - 1) * 1000);
    }
  }

  throw new Error("Max retries exceeded");
}

/*                               ROUTE HANDLER                               */
export async function POST(req: NextRequest) {
  const { jobDescription } = await req.json();

  if (!jobDescription?.trim()) {
    return NextResponse.json(
      { error: "Job description is required" },
      { status: 400 }
    );
  }

  const prompt = `Analyze the following job description and return ONLY valid JSON in this format:
{
  "summary": "two–three sentence summary",
  "recommendedSkills": ["skill1", "skill2", "skill3"]
}

Job Description:
"""
${jobDescription}
"""`;

  let answer = "";
  try {
    answer = await askOpenRouter(prompt);
  } catch (err: any) {
    console.error("OpenRouter error:", err);
    answer = "";
  }

  let summary = "";
  let recommendedSkills: string[] = [];
  let isReal = false;

  if (answer) {
    const cleaned = answer
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "");

    try {
      const parsed = JSON.parse(cleaned);
      if (parsed.summary && Array.isArray(parsed.recommendedSkills)) {
        summary = parsed.summary;
        recommendedSkills = parsed.recommendedSkills.slice(0, 3);
        isReal = true;
      }
    } catch {
      /* ignore */
    }
  }

  if (!isReal) {
    summary =
      "This role focuses on full-stack development using React and Node.js, emphasising cloud deployment and modern engineering practices.";
    recommendedSkills = ["React.js", "Node.js", "TypeScript"];
  }

  return NextResponse.json({ summary, recommendedSkills, isReal }, { status: 200 });
}
