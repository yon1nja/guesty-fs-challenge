// Store

export type Recipient = {
    recipientId: number;
    email: string;
};

export type jobRecipients = {
    id: number;
    recipientId: number; // FOREIGN KEY of Recipient
    jobId: number; // FOREIGN KEY of scheduledJob
};

export type DefinitionTable = {
    [key: number]: Definition;
};

export type Definition = {
    jobId: number;
    recipientsList: Recipient[];
    body: string;
    recurrence: string;
    timezone: string;
    created_at: number;
    end_date: number;
    last_updated: number;
    last_triggred: number;
    isEnabled: boolean;
};
export type ScheduledJob = {
    [key: number]: Job;
};

export type Job = Definition & {
    schedule_date: number;
    done: boolean;
};

export type ScheduledJobTable = {
    [key: number]: ScheduledJob;
};

export type TimeStampIndexer = number[]