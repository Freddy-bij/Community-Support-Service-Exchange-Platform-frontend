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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Posts</h1>
          <p className="text-gray-500">View and manage all platform posts</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg">
          <p className="text-sm text-gray-600">Total: <span className="font-bold">{posts.length}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Views</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-sm">{post.title}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">{post.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.views}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition" title="View">
                      <FiEye size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition" title="Edit">
                      <FiEdit2 size={16} />
                    </button>
                    {post.status === 'draft' && (
                      <button
                        onClick={() => handlePublish(post.id)}
                        className="px-3 py-1 bg-[#2C7A7B] text-white text-xs rounded hover:opacity-90 transition"
                      >
                        Publish
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
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
