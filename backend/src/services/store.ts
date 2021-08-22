import {Job, Definition,DefinitionTable} from '../types/store'

export default class Store {
    private static _instance:Store
    private _jobs: DefinitionTable

    private constructor() {
        this._jobs = {} as DefinitionTable
    }

    public static getInstance() {
        if(!this._instance) {
            this._instance = new Store()
        }

        return this._instance
    }

    addJob(job: Definition) {
        job.jobId = this.calculateNextJobId()
        this._jobs[+job.jobId] = job
    }
    addJobs(jobs: Definition[]) {
        jobs.forEach(job => {
            job.jobId = this.calculateNextJobId()
            this._jobs[job.jobId] = job;
        })
    }

    getJobs() {
        return this._jobs
    }

    disableJobById(jobId: number) {
        if(this._jobs[jobId]) {
            this._jobs[jobId].isEnabled = false;
        }
    }
    enableJobById(jobId: number) {
        if(this._jobs[jobId]) {
            this._jobs[jobId].isEnabled = true;
        }
    }

    calculateNextJobId() {
        const keys = Object.keys(this._jobs)
        return keys.length > 0 ? +keys[keys.length - 1] + 1 : 1;
    }
    getJobById(jobId: number) {
        return this._jobs[jobId];
    }

    updateJob(job: Definition) {
        this._jobs[job.jobId] = job;
    }

}
