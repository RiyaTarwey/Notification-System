// Define the Auth Interface
interface EmailAuthInterface {
    user: string;
    pass: string;
}

// Define the Email Configurations Interface
export interface EmailConfigurationsInterface {
    service: string;
    host: string;
    port: string | number;
    secure: boolean | string;
    auth: EmailAuthInterface;
}

export interface emailBodyInterFace {
    email: string;
    message: string;
    subject: string;
    emailConfigurations: EmailConfigurationsInterface
}