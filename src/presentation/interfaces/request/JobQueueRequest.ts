export interface JobQueueRequest {
    id?: number;
    name: string;
    type : number;
    payload : any;
    GUID : string
    status? : string
    topic? : string
    userId? : string
}