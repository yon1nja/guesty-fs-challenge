import {Response} from 'express';

export type MockResponse<TResult> = Response & {
    state: {
        status?: number;
        json?: TResult;
    }
}

export function makeMockResponse<T>():MockResponse<T> {
    const res = {
        state: {
            status: undefined,
            json: undefined
        }
    } as MockResponse<T>;

    res.status = (status: number) => {
        res.state.status = status
        return res;
    }

    res.json = (json: T) => {
        res.state.json = json;
        return res;
    }

    res.end = () => {
        return;
    }

    return res

}