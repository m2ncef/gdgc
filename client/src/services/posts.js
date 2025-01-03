const { API_URL } = require("@/utils/config");

const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
};

const createPost = async (post) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

const updatePost = async (id, post) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to update post");
  }

  return response.json();
};

const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to delete post");
  }

  return response.json();
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
