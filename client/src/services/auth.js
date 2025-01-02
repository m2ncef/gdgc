const { API_URL } = require("@/utils/config");

const login = async (email, password) => {
  try {
    const response = await axios.post("", { email, password });

    if (response.data.success) {
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      nav("/dashboard");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    setError("An error occurred. Please try again later.");
  }
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};
