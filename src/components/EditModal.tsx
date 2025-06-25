"use client"

import type { Job } from "@/lib/types"
import JobForm from "./JobForm"

interface EditModalProps {
  job: Job | null
  isOpen: boolean
  onClose: () => void
  onSave: (job: Omit<Job, "id" | "createdAt">) => void
}

export default function EditModal({ job, isOpen, onClose, onSave }: EditModalProps) {
  if (!isOpen || !job) return null

  const handleSave = (updatedJob: Omit<Job, "id" | "createdAt">) => {
    onSave(updatedJob)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Edit Job Application</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-rose-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <JobForm onSubmit={handleSave} initialData={job} isEditing />
        </div>
      </div>
    </div>
  )
}
