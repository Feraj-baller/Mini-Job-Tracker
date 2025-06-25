import { type NextRequest, NextResponse } from "next/server"
import { getJobs, addJob } from "@/lib/store"

export async function GET() {
  try {
    const jobs = getJobs()
    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, company, applicationLink, status } = body

    if (!title || !company || !applicationLink || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newJob = addJob({ title, company, applicationLink, status })
    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
