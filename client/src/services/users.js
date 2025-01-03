const { API_URL } = require("@/utils/config");

const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to delete user");
  }

  return response.json();
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };
