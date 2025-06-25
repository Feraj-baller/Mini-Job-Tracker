"use client"

import type React from "react"

import { useState } from "react"
import type { Job } from "@/lib/types"

interface JobFormProps {
  onSubmit: (job: Omit<Job, "id" | "createdAt">) => void
  initialData?: Job
  isEditing?: boolean
}

export default function JobForm({ onSubmit, initialData, isEditing = false }: JobFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    company: initialData?.company || "",
    applicationLink: initialData?.applicationLink || "",
    status: initialData?.status || ("Applied" as const),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    if (!isEditing) {
      setFormData({ title: "", company: "", applicationLink: "", status: "Applied" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold text-white">
        {isEditing ? "Edit Job Application" : "Add New Job Application"}
      </h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
          Company Name
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label htmlFor="applicationLink" className="block text-sm font-medium text-gray-300 mb-1">
          Application Link
        </label>
        <input
          type="url"
          id="applicationLink"
          value={formData.applicationLink}
          onChange={(e) => setFormData({ ...formData, applicationLink: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Job["status"] })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {isEditing ? "Update Job" : "Add Job"}
      </button>
    </form>
  )
}
