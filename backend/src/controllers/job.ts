import { Request, Response } from "express";

import Scheduler from "../services/scheduler";

export default class JobController {
    public static getAllJobs(req: Request, res: Response) {
        try {
            const store = Scheduler.getInstance();
            res.status(200).json(store.getSchedules());
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
    public static getJobsInTimeframe(req: Request, res: Response) {
        try {
            const scheduler = Scheduler.getInstance();
            const { from, to } = req.params;
            const jobsInTimeframe = scheduler.getSchedulesInRange(+from, +to);
            res.status(200).json(jobsInTimeframe);
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
    public static trigger(req: Request, res: Response) {
        try {
            const jobId = +req.params.jobId;
            const timestamp = +req.params.timestamp;
            const scheduler = Scheduler.getInstance();
            scheduler.trigger(jobId, timestamp);
            res.status(200).json(
                `Job #${jobId} triggered successfully at ${
                    scheduler.getScheduledJobById(jobId, timestamp)
                        .last_triggred
                }`
            );
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
    public static disableJob(req: Request, res: Response) {
        try {
            const jobId = +req.params.jobId;
            const timestamp = +req.params.timestamp;
            const scheduler = Scheduler.getInstance();
            const response = scheduler.disable(jobId, timestamp);
            //    console.log(scheduler.getScheduledJobById(jobId))
            if (response) {
                res.status(200).json(`Job #${jobId} has been disabled`);
            } else {
                res.status(400).json(`Job #${jobId} has NOT disabled`);
            }
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
    public static enableJob(req: Request, res: Response) {
        try {
            const jobId = +req.params.jobId;
            const timestamp = +req.params.timestamp;
            const scheduler = Scheduler.getInstance();
            scheduler.enable(jobId, timestamp);
            res.status(200).json(`Job #${jobId} has been enabled`);
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
    public static addJob(req: Request, res: Response) {
        try {
            req.body.jobId = 0;
            const job = req.body;
            const scheduler = Scheduler.getInstance();
            scheduler.addJob(job);
            res.status(200).json(
                `Job #${job.jobId} has been added successfully`
            );
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
}
