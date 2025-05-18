import { Guid } from "js-guid";
import { get as getUserPref } from "../../data-access/repositories/systemPrederencesRepository";
import { getOnce as getUser } from "../../data-access/repositories/userRepository";
import { sendEmail } from "../../helpers/notificationsHelper/mail";
import { catchResponseHelper, responseHelper } from "../../helpers/response"
import { JobQueueRequest } from "../../presentation/interfaces/request/JobQueueRequest";
import { NotificationInterface } from "../../presentation/interfaces/request/NotificationInterfaces";
import { initProducer } from "../../presentation/kafka/producer"
import { kafkaMaintopicsNames, queueTypes, queueTypesNames, responseMessages, userPrefrencesTypes } from "../../utils/constant"

export const createNotification = async (req: any) => {
    try {
        let data: NotificationInterface = req.body;
        let currentUserId = req.session.user.userId;
        if (
            data.notificationType == queueTypesNames.confirmationNotification ||
            data.notificationType == queueTypesNames.informationNotification ||
            data.notificationType == queueTypesNames.sensitiveNotification || data.notificationType == queueTypesNames.promotionalNotification) {
            if (!data.subject) return responseHelper(0, { message: responseMessages.isReuired.replace("{replace}", "Subject") });
            const user = await getUser({ _id: currentUserId });
            if (!user) return responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "User") });
            const guid = new Guid();
            let _guid = guid.toString()
            let dataObj: JobQueueRequest = {
                name: data.notificationType + "_" + _guid,
                payload: data,
                type: queueTypes.find(x => x.name == data.notificationType)?.id,
                GUID: _guid,
                userId: currentUserId
            }
            let produceMsg = await initProducer(dataObj, queueTypesNames.notifyOtpEmail);
            if (produceMsg) {
                return responseHelper(1, { message: responseMessages.dataCreated.replace("{replace}", "Notification job") });
            }else{
                return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "create Notification job, please try again later") });
            }

        }
        // return responseHelper(1, { message: "JOb Created" });
    } catch (error) {
        return catchResponseHelper(error)
    }
}

export const notificationTypes = async (req: any) => {
    try {
        let types = [
            queueTypesNames.sensitiveNotification,
            queueTypesNames.confirmationNotification,
            queueTypesNames.informationNotification,
            queueTypesNames.promotionalNotification,
        ];
        return responseHelper(1, types);
    } catch (error) {
        return catchResponseHelper(error)
    }
}