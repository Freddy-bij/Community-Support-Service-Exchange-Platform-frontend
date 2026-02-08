import { useState } from "react"
import { FiSave } from "react-icons/fi"

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Community Support Platform",
    siteDescription: "A platform for community support and service exchange",
    adminEmail: "admin@example.com",
    maxPostsPerDay: "10",
    moderationEnabled: true,
    emailNotifications: true,
    autoApproveMembers: false,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value })
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Admin Settings</h1>
        <p style={{ color: '#6b7280', margin: '8px 0 0 0' }}>Configure platform settings and preferences</p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>General Settings</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange('siteDescription', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'none' }}
              rows={3}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Admin Email</label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleChange('adminEmail', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>Max Posts Per Day</label>
            <input
              type="number"
              value={settings.maxPostsPerDay}
              onChange={(e) => handleChange('maxPostsPerDay', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Features & Moderation</h2>
          
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={settings.moderationEnabled}
              onChange={(e) => handleChange('moderationEnabled', e.target.checked)}
              style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label style={{ cursor: 'pointer', fontSize: '14px' }}>Enable Content Moderation</label>
          </div>

          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label style={{ cursor: 'pointer', fontSize: '14px' }}>Enable Email Notifications</label>
          </div>

          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={settings.autoApproveMembers}
              onChange={(e) => handleChange('autoApproveMembers', e.target.checked)}
              style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label style={{ cursor: 'pointer', fontSize: '14px' }}>Auto-Approve New Members</label>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSave}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#2C7A7B', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            <FiSave size={18} /> Save Settings
          </button>
          {saved && <p style={{ color: '#15803d', fontSize: '14px', margin: 0 }}>✓ Settings saved successfully!</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
