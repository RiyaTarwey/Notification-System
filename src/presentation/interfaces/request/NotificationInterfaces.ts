export interface EmailTemplateRequest {
    typeId?: number;
    content: string;
    subject: string;
}
export interface EmailWithTemplateRequest {
    email: string;
    template: string;
    payload: object;
}

export interface recipientsInterface {
    email?: string
    phone?: string
}
export interface NotificationInterface {
    notificationType: string; // The type of notification (e.g., "email", "inApp", "sms")
    message: string;          // The message body for the notification
    subject?: string;          // The subject of the notification (useful for emails)
    recipients: recipientsInterface;      // The recipient or destination (e.g., email address, phone number)
}