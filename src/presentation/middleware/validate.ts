import { responseHelper } from "../../helpers/response";

export const validate = (schema: any) => {
    return async (req: any, res: any, next: any) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const cleanedMessage = error.details[0].message.replace(/\"/g, '');
            let response = await responseHelper(0, { message: cleanedMessage }, cleanedMessage);
            return res.json(response);
        }
        next();
    };
};