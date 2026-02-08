const AdminDashboard = () => {
  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Admin Dashboard</h1>
      <p style={{ color: '#666' }}>Welcome to the admin panel</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>Total Users</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px' }}>1,234</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>Pending Moderation</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px' }}>5</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>Total Posts</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px' }}>342</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>Categories</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px' }}>12</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
