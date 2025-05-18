import { createNotification, notificationTypes } from "../../application/services/NotificationService";
import { catchResponseHelper } from "../../helpers/response"

export const create = async (req: any, res: any) => {
    try {
        res.json(await createNotification(req));
    } catch (error) {
        res.josn(catchResponseHelper(error));
    }
}
export const getNotificationTypes = async (req: any, res: any) => {
    try {
        res.json(await notificationTypes(req));
    } catch (error) {
        res.josn(catchResponseHelper(error));
    }
}