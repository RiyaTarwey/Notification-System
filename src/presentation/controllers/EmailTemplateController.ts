import { createTemplate, getTemplate, getTemplates, updateTemplate } from "../../application/services/EmailTemplateService";
import { catchResponseHelper } from "../../helpers/response"

export const create = async (req: any, res: any) => {
    try {
        let creation = await createTemplate(req);
        res.json(creation);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}
export const update = async (req: any, res: any) => {
    try {
        let creation = await updateTemplate(req);
        res.json(creation);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}
export const get = async (req: any, res: any) => {
    try {
        let templates = await getTemplates(req);
        res.json(templates);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}
export const getById = async (req: any, res: any) => {
    try {
        let template = await getTemplate(req);
        res.json(template);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}