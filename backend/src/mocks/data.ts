import {Definition, Job} from '../types/store'
const mockedJobs: Definition[] = [
    {
        jobId: 1,
        recipientsList: [{ recipientId: 1, email: "my@email.com" }],
        body: "My testing email",
        recurrence: "1 * * * *",
        timezone: "Asia/Jerusalem",
        created_at: 1629383438000,
        end_date: 1630642638000,
        last_triggred: 0,
        last_updated: 1629294854247,
        isEnabled: true,
    },
    {
        jobId: 2,
        recipientsList: [{ recipientId: 1, email: "my@email.com" }],
        body: "My testing email",
        recurrence: "1 * * * *",
        timezone: "America/Argentina/San_Juan",
        created_at: 1629383438000,
        end_date: 1630642638000,
        last_triggred: 0,
        last_updated: 1629294854247,
        isEnabled: true,
    },
    {
        jobId: 3,
        recipientsList: [{ recipientId: 1, email: "my@email.com" }],
        body: "My testing email",
        recurrence: "1 * * * *",
        timezone: "Asia/Jerusalem",
        created_at: 1629383438000,
        end_date: 1629642638000,
        last_triggred: 0,
        last_updated: 1629294854247,
        isEnabled: true,
    },
];

export default mockedJobs;