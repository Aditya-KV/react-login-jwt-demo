// Mock "backend" user store for the demo. In a real app, credentials would
// be verified by a server, which would return a properly signed JWT.
export const MOCK_USERS = [
  { userId: 1, username: "admin", password: "admin123", role: "Admin" },
  { userId: 2, username: "john", password: "john123", role: "User" },
  { userId: 3, username: "guest", password: "guest123", role: "Guest" },
];

export function findUser(username, password) {
  return MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  );
}
