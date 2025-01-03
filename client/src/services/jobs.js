import { API_URL } from "../utils/config";

export const getJobs = async () => {
  const response = await fetch(`${API_URL}/jobs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return response.json();
};

export const getJobById = async (id) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  return response.json();
};

export const createJob = async (job) => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  return response.json();
};

export const updateJob = async (id, job) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Failed to update job");
  }

  return response.json();
};

export const deleteJob = async (id) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }

  return response.json();
};

export const applyForJob = async (id) => {
  const response = await fetch(`${API_URL}/jobs/${id}/apply`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to apply for job");
  }

  return response.json();
};

export const getMyPostedJobs = async () => {
  const response = await fetch(`${API_URL}/jobs/user/posted`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch your posted jobs");
  }

  return response.json();
};

export const getMyApplications = async () => {
  const response = await fetch(`${API_URL}/jobs/user/applications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch your applications");
  }

  return response.json();
};

export const getSavedJobs = async () => {
  const response = await fetch(`${API_URL}/jobs/saved`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch saved jobs");
  }

  return response.json();
};
