import Store from "./store";
import parser from "cron-parser";
import {
    Job,
    ScheduledJob,
    Definition,
    ScheduledJobTable,
    TimeStampIndexer,
} from "../types/store";
import findClosest from '../helpers/find-first-sorted';
import seperator from '../helpers/seperate-timestamp-index';

export default class Shceduler {
    private _schedules: ScheduledJobTable;
    private _timeStampIndexer: TimeStampIndexer;
    store: Store;
    private static _instance: Shceduler;

    private constructor() {
        this.store = Store.getInstance();
        this._schedules = {};
        this._timeStampIndexer = [];
        this._updateSchedules(1);
        this._updateSchedules(2);
        this._updateSchedules(3);
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new Shceduler();
        }
        return this._instance;
    }
    trigger(jobId: number, timestamp: number) {
        const job = this._schedules[jobId][timestamp];
        job.last_triggred = new Date().getTime();
        job.last_updated = new Date().getTime();
        job.done = true;
        console.log(
            `Job number ${job.jobId} is triggred at ${new Date(
                job.last_triggred
            )}\n${job.body}`
        );
    }
    addJob(job: Definition) {
        this.store.addJob(job);
        return this._updateSchedules(job.jobId);
    }
    getSchedules():ScheduledJobTable {
        return this._schedules;
    }
    getSchedulesInRange(from:number,to:number) {
        let closestStart = findClosest(this._timeStampIndexer,+from);
        const closestEnd = findClosest(this._timeStampIndexer,+to);

        if(this._timeStampIndexer[closestStart] < from) closestStart++

        const jobsInTimeframe:ScheduledJobTable = {}

        for(let i =closestStart;i<=closestEnd;i++) {
            const {timestamp,id} = seperator(this._timeStampIndexer[i])
            if(!jobsInTimeframe[id]){
                jobsInTimeframe[id] = {}
            }
            jobsInTimeframe[id][timestamp] = this._schedules[id][timestamp];
        }

        return jobsInTimeframe;
    }
    getTimeStampIndexer() {
        return this._timeStampIndexer;
    }
    getScheduledJobById(jobId: number, timestamp: number) {
        return this._schedules[jobId][timestamp];
    }
    disable(jobId: number, timestamp: number) {
        this._schedules[jobId][timestamp].isEnabled = false;
        return true;
    }
    enable(jobId: number, timestamp: number) {
        this._schedules[jobId][timestamp].isEnabled = true;
        return true;
    }

    private _updateSchedules(jobId: number) {
        const job = this.store.getJobById(jobId);
        if (job.isEnabled) {
            this._schedules[job.jobId] = this.calculateSchedules(job);
        }
        return job.jobId;
    }
    private _createIndexFromTimestampAndID(timestamp:number,id:number):number {
        const square = id.toString().length
        const index = +id/Math.pow(10,square)
        return timestamp+index;
    }

    public calculateSchedules(job: Definition) {
        try {
            const interval = parser.parseExpression(job.recurrence, {
                startDate: job.created_at,
                endDate: job.end_date,
                tz: job.timezone,
            });
            interval.reset();
            let currentIteration;
            const scheduledJob = {} as ScheduledJob;
            while (interval.hasNext()) {
                currentIteration = interval.next();
                scheduledJob[currentIteration.getTime()] = {
                    ...job,
                    schedule_date: currentIteration.getTime(),
                    done: false,
                };
                const index = this._createIndexFromTimestampAndID(currentIteration.getTime(),job.jobId)
                this._timeStampIndexer.push(index)
            }
            this._timeStampIndexer.sort((a,b) => {return a-b})
            return scheduledJob;
        } catch (e) {
            console.log(e);
        }
    }
}
