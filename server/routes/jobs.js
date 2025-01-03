const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");
const auth = require("../middleware/auth");

// Public routes
router.get("/", auth, jobsController.getJobs);

// Protected routes
router.use(auth);

// Important: Put specific routes before parameter routes
router.get("/saved", jobsController.getSavedJobs);
router.get("/user/posted", jobsController.getMyPostedJobs);
router.get("/user/applications", jobsController.getMyApplications);

// Routes with parameters should come after specific routes
router.get("/:id", jobsController.getJobById);
router.post("/:id/apply", jobsController.applyForJob);
router.post("/:id/save", jobsController.saveJob);
router.get("/:id/saved-status", jobsController.checkSavedStatus);
router.put("/:id", jobsController.updateJob);
router.delete("/:id", jobsController.deleteJob);

// Post creation route
router.post("/", jobsController.createJob);

module.exports = router;
