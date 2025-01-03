const Job = require("../models/Job");
const User = require("../models/User");

class JobsController {
  // Get all jobs
  async getJobs(req, res) {
    try {
      const jobs = await Job.find()
        .populate("postedBy", "name")
        .sort({ postedAt: -1 });

      // Add a field to indicate if the job was posted by the current user
      const jobsWithMetadata = jobs.map((job) => ({
        ...job.toObject(),
        isOwnJob: job.postedBy._id.toString() === req.user.userId,
      }));

      res.json(jobsWithMetadata);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching jobs",
        error: error.message,
      });
    }
  }

  // Get a single job
  async getJobById(req, res) {
    try {
      const job = await Job.findById(req.params.id)
        .populate("postedBy", "name")
        .populate("applicants", "name email");

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      // Add metadata about ownership
      const jobWithMetadata = {
        ...job.toObject(),
        isOwnJob: job.postedBy._id.toString() === req.user.userId,
      };

      res.json(jobWithMetadata);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching job",
        error: error.message,
      });
    }
  }

  // Create a new job
  async createJob(req, res) {
    try {
      const { title, company, location, salary, type, description, skills } =
        req.body;

      const job = await Job.create({
        title,
        company,
        location,
        salary,
        type,
        description,
        skills,
        postedBy: req.user.userId,
      });

      const populatedJob = await job.populate("postedBy", "name");
      res.status(201).json(populatedJob);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating job", error: error.message });
    }
  }

  // Update a job
  async updateJob(req, res) {
    try {
      const { id } = req.params;
      const { title, company, location, salary, type, description, skills } =
        req.body;

      // Find the job and check ownership
      const job = await Job.findById(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.postedBy.toString() !== req.user.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this job" });
      }

      const updatedJob = await Job.findByIdAndUpdate(
        id,
        {
          title,
          company,
          location,
          salary,
          type,
          description,
          skills,
        },
        { new: true }
      ).populate("postedBy", "name");

      // Add isOwnJob flag for consistency
      const jobWithMetadata = {
        ...updatedJob.toObject(),
        isOwnJob: true,
      };

      res.json(jobWithMetadata);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating job", error: error.message });
    }
  }

  // Delete a job
  async deleteJob(req, res) {
    try {
      const { id } = req.params;

      // Find the job and check ownership
      const job = await Job.findById(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.postedBy.toString() !== req.user.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this job" });
      }

      await Job.findByIdAndDelete(id);
      res.json({ message: "Job deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting job", error: error.message });
    }
  }

  // Apply for a job
  async applyForJob(req, res) {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      if (job.status === "closed") {
        return res
          .status(400)
          .json({ message: "This job is no longer accepting applications" });
      }

      // Check if user has already applied
      if (job.applicants.includes(req.user.userId)) {
        return res
          .status(400)
          .json({ message: "You have already applied for this job" });
      }

      job.applicants.push(req.user.userId);
      await job.save();

      res.json({ message: "Application submitted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error applying for job", error: error.message });
    }
  }

  // Get jobs posted by the current user
  async getMyPostedJobs(req, res) {
    try {
      const jobs = await Job.find({ postedBy: req.user.userId })
        .populate("postedBy", "name")
        .populate("applicants", "name email")
        .sort({ postedAt: -1 });
      res.json(jobs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching your jobs", error: error.message });
    }
  }

  // Get jobs applied to by the current user
  async getMyApplications(req, res) {
    try {
      const jobs = await Job.find({ applicants: req.user.userId })
        .populate("postedBy", "name")
        .sort({ postedAt: -1 });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching your applications",
        error: error.message,
      });
    }
  }

  // Save a job
  async saveJob(req, res) {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      // Check if already saved
      if (job.savedBy.includes(req.user.userId)) {
        // Unsave the job
        job.savedBy = job.savedBy.filter(
          (userId) => userId.toString() !== req.user.userId
        );
        await job.save();
        return res.json({ message: "Job unsaved successfully" });
      }

      // Save the job
      job.savedBy.push(req.user.userId);
      await job.save();

      res.json({ message: "Job saved successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error saving job", error: error.message });
    }
  }

  // Get saved jobs
  async getSavedJobs(req, res) {
    try {
      const jobs = await Job.find({ savedBy: req.user.userId })
        .populate("postedBy", "name")
        .sort({ postedAt: -1 });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching saved jobs",
        error: error.message,
      });
    }
  }

  // Check if job is saved
  async checkSavedStatus(req, res) {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      const isSaved = job.savedBy.includes(req.user.userId);
      res.json({ isSaved });
    } catch (error) {
      res.status(500).json({
        message: "Error checking saved status",
        error: error.message,
      });
    }
  }
}

module.exports = new JobsController();
