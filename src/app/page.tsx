"use client"

import { useState, useEffect } from "react"
import type { Job } from "@/lib/types"
import JobForm from "@/components/JobForm"
import JobTable from "@/components/JobTable"
import EditModal from "@/components/EditModal"
import DeleteModal from "@/components/DeleteModal"
import JobAnalyzer from "@/components/JobAnalyzer"

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs")
      if (response.ok) {
        const jobsData = await response.json()
        setJobs(jobsData)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddJob = async (jobData: Omit<Job, "id" | "createdAt">) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      if (response.ok) {
        const newJob = await response.json()
        setJobs([...jobs, newJob])
      }
    } catch (error) {
      console.error("Error adding job:", error)
    }
  }

  const handleEditJob = async (jobData: Omit<Job, "id" | "createdAt">) => {
    if (!editingJob) return

    try {
      const response = await fetch(`/api/jobs/${editingJob.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      if (response.ok) {
        const updatedJob = await response.json()
        setJobs(jobs.map((job) => (job.id === editingJob.id ? updatedJob : job)))
        setEditingJob(null)
      }
    } catch (error) {
      console.error("Error updating job:", error)
    }
  }

  const handleDeleteJob = async () => {
    if (!deletingJobId) return

    try {
      const response = await fetch(`/api/jobs/${deletingJobId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setJobs(jobs.filter((job) => job.id !== deletingJobId))
        setDeletingJobId(null)
      }
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  const jobToDelete = jobs.find((job) => job.id === deletingJobId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Job Application Tracker</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <JobForm onSubmit={handleAddJob} />
          <JobAnalyzer />
        </div>

        <JobTable jobs={jobs} onEdit={setEditingJob} onDelete={setDeletingJobId} />

        <EditModal job={editingJob} isOpen={!!editingJob} onClose={() => setEditingJob(null)} onSave={handleEditJob} />

        <DeleteModal
          isOpen={!!deletingJobId}
          onClose={() => setDeletingJobId(null)}
          onConfirm={handleDeleteJob}
          jobTitle={jobToDelete?.title || ""}
        />
      </div>
    </div>
  )
}
