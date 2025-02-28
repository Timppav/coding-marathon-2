const Job = require("../models/jobModel");
const mongoose = require("mongoose");

const getAllJobs = async (req, res) => {
    try {
        const limit = parseInt(req.query._limit);
        const jobs = limit 
        ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
        : await Job.find({}).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getJobById = async (req, res) => {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve job" });
    }
};

const createJob = async (req, res) => {
    try {
        const newJob = await Job.create({ ...req.body });
        res.status(201).json(newJob);
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({ message: "Invalid input", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to create job", error: error.message });
        }
    }
};

const updateJob = async (req, res) => {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            res.status(404).json({ message: "Job not found" });
        }

        if (req.body.company) {
            req.body.company = {
                ...job.company.toObject(),
                ...job.company
            };
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
            new: true
        });

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: "Failed to update job" });
    }
};

const deleteJob = async (req, res) => {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
    }

    try {
        const deletedJob = await Job.findOneAndDelete({ _id: jobId });

        if (!deletedJob) {
            res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve job" });
    }
};

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
};