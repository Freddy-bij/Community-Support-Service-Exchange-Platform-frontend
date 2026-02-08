import { useState } from "react"
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Technical Support", description: "Programming and technical help", posts: 45, created: "2024-01-15" },
    { id: 2, name: "Design & Creative", description: "Design guidance and creative feedback", posts: 28, created: "2024-01-15" },
    { id: 3, name: "General Discussion", description: "Off-topic and general conversations", posts: 92, created: "2024-01-15" },
    { id: 4, name: "Learning Resources", description: "Educational materials and tutorials", posts: 34, created: "2024-01-20" },
    { id: 5, name: "Project Showcase", description: "Share your projects and portfolios", posts: 18, created: "2024-01-25" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([...categories, {
        id: Math.max(...categories.map(c => c.id)) + 1,
        name: newCategory.name,
        description: newCategory.description,
        posts: 0,
        created: new Date().toISOString().split('T')[0]
      }])
      setNewCategory({ name: "", description: "" })
      setShowModal(false)
    }
  }

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Categories</h1>
          <p className="text-gray-500">Create and manage content categories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#2C7A7B] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition"
        >
          <FiPlus size={18} /> New Category
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Create New Category</h2>
            <input
              type="text"
              placeholder="Category name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#2C7A7B]"
            />
            <textarea
              placeholder="Category description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2C7A7B]"
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-[#2C7A7B] text-white rounded-lg hover:opacity-90 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl p-6 border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
              </div>
            </div>

            <div className="flex gap-4 my-4 text-sm">
              <div>
                <p className="text-gray-500">Posts</p>
                <p className="font-semibold">{category.posts}</p>
              </div>
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-semibold">{category.created}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition">
                <FiEdit2 size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
              >
                <FiTrash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesManagement
