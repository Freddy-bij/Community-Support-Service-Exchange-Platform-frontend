import { useState } from "react"
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi"

const PostsManagement = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Need help with coding", author: "John Doe", category: "Technical", status: "published", views: 234, date: "2024-02-08" },
    { id: 2, title: "Looking for design advice", author: "Jane Smith", category: "Design", status: "published", views: 156, date: "2024-02-08" },
    { id: 3, title: "React best practices", author: "Mike Johnson", category: "Technical", status: "published", views: 892, date: "2024-02-07" },
    { id: 4, title: "UI/UX trends in 2024", author: "Sarah Williams", category: "Design", status: "draft", views: 0, date: "2024-02-07" },
    { id: 5, title: "Project collaboration tips", author: "David Brown", category: "General", status: "published", views: 445, date: "2024-02-06" },
  ])

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const handlePublish = (id: number) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: "published" } : post))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Manage Posts</h1>
          <p style={{ color: '#6b7280', margin: '8px 0 0 0' }}>View and manage all platform posts</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Total: <span style={{ fontWeight: 'bold' }}>{posts.length}</span></p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Title</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Author</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Category</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Views</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Date</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={post.id} style={{ borderBottom: idx < posts.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ fontWeight: '500', fontSize: '14px', margin: 0 }}>{post.title}</p>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{post.author}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: '#e9d5ff', color: '#6b21a8', fontSize: '12px', borderRadius: '9999px' }}>{post.category}</span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: post.status === 'published' ? '#dcfce7' : '#f3f4f6', color: post.status === 'published' ? '#15803d' : '#374151', fontSize: '12px', borderRadius: '9999px' }}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{post.views}</td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{post.date}</td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#dbeafe', color: '#1e40af', border: 'none', cursor: 'pointer' }} title="View">
                      <FiEye size={16} />
                    </button>
                    <button style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fed7aa', color: '#92400e', border: 'none', cursor: 'pointer' }} title="Edit">
                      <FiEdit2 size={16} />
                    </button>
                    {post.status === 'draft' && (
                      <button
                        onClick={() => handlePublish(post.id)}
                        style={{ padding: '4px 12px', backgroundColor: '#2C7A7B', color: 'white', fontSize: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      >
                        Publish
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer' }}
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostsManagement
