import EmailTemplates from '../../domain/models/emailTemplates';
import { catchResponseHelper } from '../../helpers/response';
import { EmailTemplateRequest } from '../../presentation/interfaces/request/NotificationInterfaces';

// Create a new email template
export const create = async (tempData: EmailTemplateRequest) => {
    try {
        const template = await EmailTemplates.create(tempData);
        return template;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};

export const update = async (param: any, data: EmailTemplateRequest) => {
    try {
        const result = await EmailTemplates.updateOne(param, { $set: data });
        return result.modifiedCount;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};

// Get email templates based on parameters
export const get = async (params: any): Promise<any[]> => {
    try {
        const templates = await EmailTemplates.find(params);
        return templates || [];
    } catch (error: any) {
        catchResponseHelper(error);
        return [];
    }
};

// Get email template by ID
export const getById = async (id: string) => { // MongoDB uses string IDs by default
    try {
        const template = await EmailTemplates.findById(id);
        return template;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};
