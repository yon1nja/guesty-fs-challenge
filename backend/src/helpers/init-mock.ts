import Store from '../services/store'
import Scheduler from '../services/scheduler'
import mockData from '../mocks/data'

export default function init() {
    const store = Store.getInstance();
    store.addJobs(mockData);
    Scheduler.getInstance();
}