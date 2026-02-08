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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Manage Categories</h1>
          <p style={{ color: '#6b7280', margin: '8px 0 0 0' }}>Create and manage content categories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: '#2C7A7B', color: 'white', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}
        >
          <FiPlus size={18} /> New Category
        </button>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', maxWidth: '448px', width: '100%', margin: '0 16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Create New Category</h2>
            <input
              type="text"
              placeholder="Category name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', marginBottom: '12px', outline: 'none' }}
            />
            <textarea
              placeholder="Category description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', marginBottom: '16px', outline: 'none', resize: 'none' }}
              rows={3}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                style={{ padding: '8px 16px', backgroundColor: '#2C7A7B', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>{category.name}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px', margin: '8px 0 0 0' }}>{category.description}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '32px', margin: '16px 0', fontSize: '14px' }}>
              <div>
                <p style={{ color: '#6b7280', margin: 0 }}>Posts</p>
                <p style={{ fontWeight: '600', margin: '4px 0 0 0' }}>{category.posts}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', margin: 0 }}>Created</p>
                <p style={{ fontWeight: '600', margin: '4px 0 0 0' }}>{category.created}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#fed7aa', color: '#92400e', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                <FiEdit2 size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
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
