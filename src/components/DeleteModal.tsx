"use client"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  jobTitle: string
}

export default function DeleteModal({ isOpen, onClose, onConfirm, jobTitle }: DeleteModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-md w-full border border-gray-700">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Delete Job Application</h3>
          <p className="text-gray-300 mb-6">
            Are you sure you want to delete the application for "{jobTitle}"? This action cannot be undone.
          </p>
          <div className="flex space-x-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-rose-600 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
