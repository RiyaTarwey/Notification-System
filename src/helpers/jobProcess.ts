import { JobQueueRequest } from "../presentation/interfaces/request/JobQueueRequest"
import logger from "../presentation/middleware/logger"
import { addJobs } from "../presentation/queue/queue"
import { queueTypes, queueTypesNames, userPrefrencesTypes } from "../utils/constant"
import { _sendEmail, sendEmail } from "./notificationsHelper/mail"
import { getOnce as getUserPref } from "../data-access/repositories/systemPrederencesRepository";
import twilio from 'twilio';
import { decrypt } from "../presentation/middleware/security"

export const processEmailJobs = async (job: JobQueueRequest) => {
    try {
        if (!job || !job.type) return true

        if (job.type == queueTypes.find(x => x.name == queueTypesNames.notifyOtpEmail)?.id) {
            let sendMailForOtp = await _sendEmail(
                job.payload.email,
                job.payload.template,
                job.payload.payload
            );
            if (!sendMailForOtp) return false
        } else if (
            job.type == queueTypes.find(x => x.name == queueTypesNames.sensitiveNotification)?.id ||
            job.type == queueTypes.find(x => x.name == queueTypesNames.confirmationNotification)?.id ||
            job.type == queueTypes.find(x => x.name == queueTypesNames.informationNotification)?.id
        ) {
            let getNotificationCOnfigurations = await getUserPref({ userId: job.userId, type: userPrefrencesTypes.emailSmtp });
            let smtp = getNotificationCOnfigurations.value;
            let sendEmailToRecp = await sendEmail({ email: job.payload.recipients.email, emailConfigurations: smtp, message: job.payload.message, subject: job.payload.subject })
            if (sendEmailToRecp)
                return true
            else
                return false

        }
        return true
    } catch (error: any) {
        logger.error(`error while process job ${error?.message}`)
        return false
    }
}
export const processSmsJobs = async (job: JobQueueRequest) => {
    try {
        if (!job || !job.type) return true

        let getNotificationCOnfigurations = await getUserPref({ userId: job.userId, type: userPrefrencesTypes.twilloSmsConfiguration });

        if (getNotificationCOnfigurations?.value?.accountSid) {
            const accountSid = await decrypt(getNotificationCOnfigurations?.value?.accountSid);
            const authToken = await decrypt(getNotificationCOnfigurations?.value?.authToken);
            const fromPhone = await decrypt(getNotificationCOnfigurations?.value?.fromPhone);
            const toPhone = job.payload.recipients.phone;

            const client = twilio(accountSid, authToken);
            let senrm = client.messages
                .create({
                    body: job.payload.message,
                    to: toPhone,
                    from: fromPhone
                })
                .then(message => {console.log('Message sent with SID:', message.sid); logger.info('Message sent with SID:', message.sid)})
                .catch(error => console.error('Error sending message:', error));
        }
        return true
        // let pushToQueue = await addJobs(job);
        // if (pushToQueue) return true;
        // else return false
    } catch (error: any) {
        logger.error(`error while process job ${error?.message}`)
        return false
    }
}