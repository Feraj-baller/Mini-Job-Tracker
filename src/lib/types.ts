export interface Job {
  id: string
  title: string
  company: string
  applicationLink: string
  status: "Applied" | "Interviewing" | "Rejected" | "Offer"
  createdAt: string
}

export interface JobAnalysis {
  summary: string
  recommendedSkills: string[]
}
