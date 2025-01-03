const { API_URL } = require("@/utils/config");

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.status !== 200) {
    throw new Error("Login failed");
  }

  localStorage.setItem("token", response.token);

  const data = await response.json();
  return { user: data.user, token: data.token };
};

const logout = () => {
  localStorage.removeItem("token");
};

const register = async (email, password, name) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });

  if (response.status !== 200) {
    throw new Error("Registration failed");
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);

  return { user: data.user, token: data.token };
};

module.exports = { login, logout, register };
