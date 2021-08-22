import express from 'express';

import JobController from '../controllers/job'
const router = express.Router();

router.get("/all", JobController.getAllJobs)
router.get("/timeframe/:from/:to", JobController.getJobsInTimeframe)

router.post("/trigger/:jobId/:timestamp", JobController.trigger)
router.post("/add", JobController.addJob)

router.put("/disable/:jobId/:timestamp", JobController.disableJob)
router.put("/enable/:jobId/:timestamp", JobController.enableJob)



export default router