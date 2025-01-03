import { API_URL } from "@/utils/config";

export const getUsers = async () => {
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

export const getUserById = async (id) => {
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

export const updateUser = async (id, user) => {
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

export const updateProfile = async (user) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to update profile");
  }

  const data = await response.json();
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data._id,
      name: data.name,
      email: data.email,
    })
  );

  return data;
};

export const deleteUser = async (id) => {
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
