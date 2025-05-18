export interface SystemPrefRequest {
    id?: any;
    name?: string;
    userId?: string;
    type?: string;
    value: Object;
}

export interface twilioConfigReuquest {
    accountSid: string;
    authToken: string;
    fromPhone: string;
}