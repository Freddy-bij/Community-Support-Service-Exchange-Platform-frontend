import { useEffect, useState } from "react"
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"
import Categoryservice, { type Category } from "../Serivices/Categoryservice"

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [submitting, setSubmitting] = useState(false)

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError("")
      const categoriesData = await Categoryservice.getCategories()
      console.log('Categories data:', categoriesData)
      setCategories(categoriesData)
    } catch {
      setError("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.description) {
      setError("Category name and description are required")
      return
    }

    try {
      setSubmitting(true)
      setError("")
      // Mock create - replace with actual API call when available
      await new Promise(resolve => setTimeout(resolve, 500))
      fetchCategories()
      setNewCategory({ name: "", description: "" })
      setShowModal(false)
    } catch (err: unknown) {
      if (err instanceof Error && (err.message.includes('409') || err.message.toLowerCase().includes('conflict') || err.message.toLowerCase().includes('already exists'))) {
        setError(`Category "${newCategory.name}" already exists. Please use a different name.`)
      } else {
        setError("Failed to create category")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        setActionLoading(categoryId)
        // Mock delete - replace with actual API call when available
        await new Promise(resolve => setTimeout(resolve, 500))
        fetchCategories()
      } catch {
        setError("Failed to delete category")
      } finally {
        setActionLoading(null)
      }
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Manage Categories</h1>
          <p style={{ color: '#6b7280', margin: '8px 0 0 0' }}>Create and manage content categories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={submitting}
          style={{ backgroundColor: '#2C7A7B', color: 'white', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}
        >
          <FiPlus size={18} /> New Category
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', padding: '12px 16px', borderRadius: '8px', color: '#991b1b', marginBottom: '16px', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', maxWidth: '448px', width: '100%', margin: '0 16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Create New Category</h2>
            <input
              type="text"
              placeholder="Category name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              disabled={submitting}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', marginBottom: '12px', outline: 'none' }}
            />
            <textarea
              placeholder="Category description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              disabled={submitting}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', marginBottom: '16px', outline: 'none', resize: 'none' }}
              rows={3}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                disabled={submitting}
                style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                disabled={submitting}
                style={{ padding: '8px 16px', backgroundColor: '#2C7A7B', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}
              >
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p style={{ color: '#6b7280' }}>No categories found. Create one to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {categories.map((category) => (
            <div
              key={category.id}
              style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>{category.name || "N/A"}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px', margin: '8px 0 0 0' }}>{category.description || "No description"}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '32px', margin: '16px 0', fontSize: '14px' }}>
                <div>
                  <p style={{ color: '#6b7280', margin: 0 }}>Status</p>
                  <p style={{ fontWeight: '600', margin: '4px 0 0 0' }}>{category.isActive ? "Active" : "Inactive"}</p>
                </div>
                <div>
                  <p style={{ color: '#6b7280', margin: 0 }}>Created</p>
                  <p style={{ fontWeight: '600', margin: '4px 0 0 0' }}>
                    {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                <button 
                  disabled={actionLoading === category.id}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#fed7aa', color: '#92400e', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: actionLoading === category.id ? 0.6 : 1 }}
                >
                  <FiEdit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  disabled={actionLoading === category.id}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: actionLoading === category.id ? 0.6 : 1 }}
                >
                  <FiTrash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoriesManagement
