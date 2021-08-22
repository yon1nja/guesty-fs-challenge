import Store from "./store";
import mockedJobs from '../mocks/data'
import {Definition, Job} from '../types/store'

describe("Store", () => {
    let store: Store;

    beforeAll(() => {
        store = Store.getInstance();
        store.addJobs(mockedJobs)
    })

    it("Should return array of jobs", () => {
        expect(Object.keys(store.getJobs()).length).toBeGreaterThan(0);
    })

    it("Should add new job and change it jobId  to be +1 from the last job in the array",() => {
        const newJob:Definition = {
            jobId: 0,
            recipientsList: [{recipientId: 1,email:'my@email.com'}],
            body: 'My new special job test',
            recurrence: '0 0 1 1 *',
            timezone: 'Asia/Jerusalem',
            end_date: new Date().getTime() + 31000000,
            created_at: new Date().getTime(),
            last_triggred: new Date().getTime(),
            last_updated: new Date().getTime(),
            isEnabled: true
        }

        store.addJob(newJob);
        const jobList = store.getJobs();
        let keys = Object.keys(jobList)
        const previousJobId = +keys[keys.length - 2];
        const newestJobInMemory = +keys[keys.length - 1];

        expect(jobList[newestJobInMemory].body).toEqual(newJob.body);
        expect(newestJobInMemory).toEqual(previousJobId + 1)
    })

    it("should update a given job",() => {
        const jobToUpdate:Definition = {
            jobId: 2,
            recipientsList: [{recipientId: 1,email:'my@email.com'}],
            body: 'My edited job test', // this is what changed
            recurrence: '0 0 1 1 *',
            timezone: 'Asia/Jerusalem',
            end_date: new Date().getTime() + 31000000,
            created_at: new Date().getTime(),
            last_triggred: new Date().getTime(),
            last_updated: new Date().getTime(),
            isEnabled: true
        }

        const jobBeforeUpdate = store.getJobById(jobToUpdate.jobId);

        store.updateJob(jobToUpdate);
        const updatedJob = store.getJobById(jobToUpdate.jobId)

        expect(updatedJob).toStrictEqual(jobToUpdate);
        expect(updatedJob).not.toEqual(jobBeforeUpdate);
    })

    it("should disable a job by a given id", () => {
        const jobId = 2
        const job = store.getJobById(jobId)

        expect(job.isEnabled).toBeTruthy();

        store.disableJobById(jobId)
        
        expect(job.isEnabled).toBeFalsy();
    })
    // it("should return only enabled jobs", () => {
    //     const enabledJobs = store.getEnabledJobs();
    //     const allJobs = store.getJobs();
    //     expect(enabledJobs.length).toBeLessThan(allJobs.length);
    // })

})