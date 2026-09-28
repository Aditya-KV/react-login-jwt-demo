import { useState } from "react";
import { findUser } from "../data/users";
import { generateToken, storeToken } from "../utils/token";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    const user = findUser(username.trim(), password);
    if (!user) {
      setError("Invalid username or password.");
      return;
    }

    // Simulate what a server would do after verifying credentials:
    // issue a JWT-like token carrying userId and role.
    const token = generateToken({
      userId: user.userId,
      role: user.role,
      username: user.username,
    });

    storeToken(token);
    onLoginSuccess(token);
  }

  return (
    <div className="auth-card">
      <h1>Sign in</h1>
      <p className="hint">
        Try <code>admin / admin123</code>, <code>john / john123</code>, or{" "}
        <code>guest / guest123</code>
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
