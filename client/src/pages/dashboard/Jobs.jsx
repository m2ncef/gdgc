import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, X } from "lucide-react";
import {
  getJobs,
  createJob,
  applyForJob,
  getMyApplications,
  deleteJob,
  updateJob,
} from "../../services/jobs";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    skills: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchMyApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const applications = await getMyApplications();
      setMyApplications(applications);
      setAppliedJobIds(new Set(applications.map((job) => job._id)));
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const createdJob = await createJob({
        ...newJob,
        skills: newJob.skills.filter(Boolean),
      });
      setJobs((prev) => [createdJob, ...prev]);
      setIsNewJobModalOpen(false);
      setNewJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "Full-time",
        description: "",
        skills: [],
      });
    } catch (error) {
      console.error("Failed to create job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applyForJob(jobId);
      setAppliedJobIds((prev) => new Set([...prev, jobId]));
      fetchMyApplications(); // Refresh applications list
    } catch (error) {
      console.error("Failed to apply for job:", error);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob({
      ...job,
      skills: job.skills || [], // Ensure skills is an array
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedJob = await updateJob(editingJob._id, editingJob);
      setJobs((prev) =>
        prev.map((job) => (job._id === updatedJob._id ? updatedJob : job))
      );
      setIsEditModalOpen(false);
      setEditingJob(null);
    } catch (error) {
      console.error("Failed to update job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const JobCard = ({ job, showApplyButton = true }) => (
    <Card key={job._id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{job.type}</Badge>
            {job.isOwnJob && (
              <Badge variant="outline" className="bg-blue-50">
                Your Post
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.salary}</span>
            <span>•</span>
            <span>Posted by {job.postedBy?.name || "Anonymous"}</span>
          </div>
          <p>{job.description}</p>
          <div className="flex gap-2 flex-wrap">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-sm text-muted-foreground">
              Posted {new Date(job.postedAt).toLocaleDateString()}
            </span>
            {showApplyButton && !job.isOwnJob && (
              <Button
                onClick={() => handleApply(job._id)}
                disabled={appliedJobIds.has(job._id)}
              >
                {appliedJobIds.has(job._id) ? "Applied" : "Apply Now"}
              </Button>
            )}
            {job.isOwnJob && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEditJob(job)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteJob(job._id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="browse" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>
          <Button onClick={() => setIsNewJobModalOpen(true)}>Post a Job</Button>
        </div>

        <TabsContent value="browse" className="mt-6">
          <div className="grid gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="mt-6">
          <div className="grid gap-6">
            {myApplications.length === 0 ? (
              <p className="text-muted-foreground">
                You haven't applied to any jobs yet.
              </p>
            ) : (
              myApplications.map((job) => (
                <JobCard key={job._id} job={job} showApplyButton={false} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Job Modal */}
      {isNewJobModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl m-4">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Post New Job</h2>
              <button
                onClick={() => setIsNewJobModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newJob.company}
                    onChange={(e) =>
                      setNewJob((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) =>
                      setNewJob((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) =>
                      setNewJob((prev) => ({ ...prev, salary: e.target.value }))
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newJob.type}
                    onChange={(e) =>
                      setNewJob((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={newJob.skills.join(", ")}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    }))
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, TypeScript"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewJobModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Post Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {isEditModalOpen && editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl m-4">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Job</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingJob(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateJob} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) =>
                    setEditingJob((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editingJob.company}
                    onChange={(e) =>
                      setEditingJob((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) =>
                      setEditingJob((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <input
                    type="text"
                    value={editingJob.salary}
                    onChange={(e) =>
                      setEditingJob((prev) => ({
                        ...prev,
                        salary: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={editingJob.type}
                    onChange={(e) =>
                      setEditingJob((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingJob.description}
                  onChange={(e) =>
                    setEditingJob((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingJob.skills.join(", ")}
                  onChange={(e) =>
                    setEditingJob((prev) => ({
                      ...prev,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    }))
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, TypeScript"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingJob(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
