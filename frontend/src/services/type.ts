export interface ResponseBook <T> {
    status: BookStatus;
    data?: T;
    error?: string;
}

export enum BookStatus {
    Success = 'SUCCESS',
    Error = 'ERROR',
}