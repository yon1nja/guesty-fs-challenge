import JobController from "./job"
import Store from '../services/store'
import Scheduler from '../services/scheduler'

import {makeMockRequest} from '../mocks/mock-request'
import {makeMockResponse} from '../mocks/mock-response'


import mockedJobs from '../mocks/data'

describe("routes/JobController", () => {
    let store: Store;
    let jobs = [];
    beforeAll(() => {
        store = Store.getInstance()
        store.addJobs(mockedJobs)
    })
    it('should return job list', () => {
        const req = makeMockRequest({params: {}});
        const res = makeMockResponse<[]>();

        JobController.getAllJobs(req,res)
        expect(Object.keys(res.state.json).length).toBeGreaterThan(0)
        expect(res.state.status).toBe(200)
    })
    it('should get a jobs in a given timeframe', () => {
        const startDate = new Date();
        const endDate = new Date(startDate.getFullYear()+1);
        
        const req = makeMockRequest({params:{from:startDate.getTime().toString(),to:endDate.getTime().toString()}})
        const res = makeMockResponse<[]>();

        JobController.getJobsInTimeframe(req,res)
        jobs = res.state.json;
        expect(Object.keys(res.state.json).length).toBeGreaterThan(0)
        expect(res.state.status).toBe(200)
    })
})