import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { getToken, decodeToken, isTokenExpired, clearToken } from "./utils/token";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // On mount, look for a previously stored token and restore the session
  // if it's still valid — this is what makes the login persist on refresh.
  useEffect(() => {
    const token = getToken();
    const payload = decodeToken(token);

    if (payload && !isTokenExpired(payload)) {
      setUser(payload);
    } else if (token) {
      clearToken();
    }

    setCheckingSession(false);
  }, []);

  function handleLoginSuccess(token) {
    setUser(decodeToken(token));
  }

  function handleLogout() {
    clearToken();
    setUser(null);
  }

  if (checkingSession) {
    return null;
  }

  return (
    <div className="app-shell">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
