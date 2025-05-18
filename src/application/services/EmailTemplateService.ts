import { create, get, getById, update } from "../../data-access/repositories/emailTemplatesRepository";
import { catchResponseHelper, responseHelper } from "../../helpers/response";
import { EmailTemplateRequest } from "../../presentation/interfaces/request/NotificationInterfaces";
import { emailTemplateTypesEnum, responseMessages } from "../../utils/constant";


export const createTemplate = async (req: any) => {
    try {
        let response;
        let type = emailTemplateTypesEnum.find(x => x.id == parseInt(req.body.typeId));
        if (!type)
            return responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "Type") });
        let checkIfExistAlready = await get({ typeId: parseInt(req.body.typeId) });
        if (checkIfExistAlready && checkIfExistAlready.length > 0)
            return responseHelper(0, { message: responseMessages.alreadyExist.replace("{replace}", "Email template") });
        let body: EmailTemplateRequest = {
            typeId: req.body.typeId,
            content: req.body.content,
            subject: req.body.subject,
        };
        let creation = await create(body);
        if (creation) {
            response = responseHelper(1, { message: responseMessages.dataCreated.replace("{replace}", "Email template") });
        }
        else
            response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "create template") });
        return response;
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

export const updateTemplate = async (req:any) => {
    try {
        let type = emailTemplateTypesEnum.find(x => x.id == parseInt(req.body.typeId));
        if (!type)
            return responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "Type") });
        let checkIfExistAlready = await get({ typeId: parseInt(req.body.typeId) });
        if (!checkIfExistAlready || checkIfExistAlready.length <= 0)
            return responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "Email template") });

        let body: EmailTemplateRequest = {
            content: req.body.content,
            subject: req.body.subject,
        };
        let updateTempate = await update({typeId : parseInt(req.body.typeId)},body);
        if (updateTempate && updateTempate > 0) return responseHelper(1, { message: responseMessages.dataUpdated.replace("{replace}", "Email template") });
        else return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "Update Email template") });
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}
export const getTemplates = async (req: any) => {
    try {
        let response;
        let templates = await get(req.body || {});
        response = responseHelper(1, templates);
        return response
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}
export const getTemplate = async (req: any) => {
    try {
        let response;
        let template = await getById(req.params.id);
        response = responseHelper(1, template);
        return response
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}