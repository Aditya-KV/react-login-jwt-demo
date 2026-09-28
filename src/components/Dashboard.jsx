export default function Dashboard({ user, onLogout }) {
  return (
    <div className="auth-card">
      <h1>Dashboard</h1>
      <p className="hint">This view is only rendered while a valid token is stored.</p>

      <div className="user-info">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>User ID:</strong> {user.userId}
        </p>
        <p>
          <strong>Role:</strong> <span className="role-badge">{user.role}</span>
        </p>
      </div>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
