import { API_URL } from "../utils/config";

export const getPosts = async () => {
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

export const getPostById = async (id) => {
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

export const createPost = async (post) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export const upvotePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}/upvote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to upvote post");
  }

  return response.json();
};

export const downvotePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}/downvote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to downvote post");
  }

  return response.json();
};

export const updatePost = async (id, post) => {
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

export const deletePost = async (id) => {
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

export const getCommentsByPostId = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}/comments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
};

export const createComment = async (postId, comment) => {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(comment),
  });

  if (response.status !== 200) {
    throw new Error("Failed to create comment");
  }

  return response.json();
};

export const getComments = async (postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
};

export const savePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to save post");
  }

  return response.json();
};

export const getSavedPosts = async () => {
  const response = await fetch(`${API_URL}/posts/saved`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch saved posts");
  }

  return response.json();
};
