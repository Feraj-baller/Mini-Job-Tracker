"use client"

import { useState } from "react"
import type { JobAnalysis } from "@/lib/types"

interface ExtendedJobAnalysis extends JobAnalysis {
  isReal?: boolean
  error?: string
  note?: string
}

export default function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState("")
  const [analysis, setAnalysis] = useState<ExtendedJobAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return

    setIsLoading(true)
    setAnalysis(null)

    try {
      console.log("🚀 Starting analysis...")

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      })

      console.log("📡 Response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("📊 Analysis result:", result)
        setAnalysis(result)
      } else {
        console.error("❌ Response not ok:", response.status, response.statusText)
        const errorText = await response.text()
        console.error("Error response body:", errorText)
      }
    } catch (error) {
      console.error("💥 Fetch error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4">Analyze Job Description</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-300 mb-2">
            Paste Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Paste the job description here to get AI-powered insights..."
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!jobDescription.trim() || isLoading}
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? "Analyzing with AI..." : "Analyze Job Description"}
        </button>
      </div>

      {analysis && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-white">Analysis Results</h3>
            <span
              className={`text-xs px-2 py-1 rounded ${
                analysis.isReal ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
              }`}
            >
              {analysis.isReal ? "AI Generated" : "Mock Data"}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-300 mb-2">Summary</h4>
              <p className="text-gray-400">{analysis.summary}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-300 mb-2">Recommended Resume Skills</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.recommendedSkills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-emerald-900 text-emerald-300 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {analysis.error && <div className="text-red-400 text-sm">Debug info: {analysis.error}</div>}
          </div>
        </div>
      )}
    </div>
  )
}
