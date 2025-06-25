import type { Job } from "./types"

// Simple in-memory store for jobs
const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Corp",
    applicationLink: "https://example.com/job1",
    status: "Applied",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    applicationLink: "https://example.com/job2",
    status: "Interviewing",
    createdAt: new Date().toISOString(),
  },
]

export const getJobs = (): Job[] => jobs

export const addJob = (job: Omit<Job, "id" | "createdAt">): Job => {
  const newJob: Job = {
    ...job,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  jobs.push(newJob)
  return newJob
}

export const updateJob = (id: string, updates: Partial<Job>): Job | null => {
  const index = jobs.findIndex((job) => job.id === id)
  if (index === -1) return null

  jobs[index] = { ...jobs[index], ...updates }
  return jobs[index]
}

export const deleteJob = (id: string): boolean => {
  const index = jobs.findIndex((job) => job.id === id)
  if (index === -1) return false

  jobs.splice(index, 1)
  return true
}
