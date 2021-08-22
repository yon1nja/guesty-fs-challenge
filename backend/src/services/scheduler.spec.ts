import Scheduler from './scheduler'
import Store from './store'
import mockedJobs from '../mocks/data'
import {Job,ScheduledJob,Definition} from '../types/store'

describe("services/Scheduler",() => {
    let scheduler:Scheduler
    let store: Store

    beforeAll(() => {
        store = Store.getInstance()
        store.addJobs(mockedJobs)
        scheduler = Scheduler.getInstance();
    })
    it("should add a job to schedule", () => {
        const newJob:Definition = {
            jobId: 0,
            recipientsList: [{recipientId: 1,email:'my@email.com'}],
            body: 'Added scheduled job to scheduler',
            recurrence: '1 * * * *',
            timezone: 'Asia/Jerusalem',
            end_date: new Date().getTime() + 31000000,
            created_at: new Date().getTime(),
            last_triggred: new Date().getTime(),
            last_updated: new Date().getTime(),
            isEnabled: true
        }

        let newJobId = scheduler.addJob(newJob);
        const scheduleList = scheduler.getSchedules();
        const lastJobInList = scheduleList[newJobId]
        let timestamp = Object.keys(lastJobInList);
        expect(lastJobInList[+timestamp[timestamp.length - 1]].body).toStrictEqual(newJob.body)
    })
    it("should trigger a job", () => {
        const jobId = 2;
        const timestamp = 1630249260000;
        const jobBeforeTrigger = {} as Job
        Object.assign(jobBeforeTrigger,scheduler.getScheduledJobById(jobId,timestamp))
        expect(jobBeforeTrigger.done).toBeFalsy
        scheduler.trigger(2,timestamp);

        const jobAfterTrigger = scheduler.getScheduledJobById(jobId,timestamp);

        expect(jobBeforeTrigger.body).toStrictEqual(jobAfterTrigger.body);
        expect(jobBeforeTrigger.last_triggred).toBeLessThan(jobAfterTrigger.last_triggred);
        expect(jobBeforeTrigger.last_updated).toBeLessThan(jobAfterTrigger.last_updated);
    })
    it("should return a job on requested id", () => {
        const jobId = 2;
        const timestamp = 1630249260000;
        const job = scheduler.getScheduledJobById(jobId,timestamp);

        expect(job.jobId).toEqual(jobId)
    })

    it("should calculate schedules", () => {
        const newJob:Definition = {
            jobId: 2,
            recipientsList: [{recipientId: 1,email:'my@email.com'}],
            body: 'Added scheduled job to scheduler',
            recurrence: '0 0 1 1 *',
            timezone: 'Asia/Jerusalem',
            end_date: new Date().getTime() + 31000000,
            created_at: new Date().getTime(),
            last_triggred: new Date().getTime(),
            last_updated: new Date().getTime(),
            isEnabled: true
        }
        scheduler.calculateSchedules(newJob);
    })
})