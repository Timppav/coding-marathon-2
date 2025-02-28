const express = require("express");
const router = express.Router();
const {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} = require("../controllers/jobController");
const auth = require("../middleware/requireAuth")


// Public routes
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

// Protected routes
router.post("/", auth, createJob);
router.put("/:jobId", auth, updateJob);
router.delete("/:jobId", auth, deleteJob);

module.exports = router;