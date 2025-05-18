import { create, get, getOnce, update } from "../../data-access/repositories/systemPrederencesRepository";
import { catchResponseHelper, responseHelper } from "../../helpers/response";
import { SystemPrefRequest, twilioConfigReuquest } from "../../presentation/interfaces/request/SystemPrefRequest";
import { encrypt } from "../../presentation/middleware/security";
import { PrefTypesArr, responseMessages, userPrefrencesTypes } from "../../utils/constant";

export const preferencesTypes = async () => {
  try {
    let prefTypes = PrefTypesArr;
    let response = responseHelper(1, prefTypes)
    return response
  } catch (error) {
    let response = catchResponseHelper(error);
    return response;
  }
}

export const getUserPreferences = async (req: any) => {
  try {
    let currentUserId = req.session.user.userId;
    let preferences = await get({ userId: currentUserId });
    return responseHelper(1, preferences)
  } catch (error) {
    let response = catchResponseHelper(error);
    return response;
  }
}

export const updateUserPreferences = async (req: any) => {
  try {
    let url = req.url;
    let getUser = req.session.user;
    if (url.includes("email-configurations")) {
      let ifExist = await getOnce({ type: userPrefrencesTypes.emailSmtp, userId: getUser.userId });
      let emailConfigurationsObj = {
        "service": req.body?.service || "",
        "host": req.body?.host || "",
        "port": req.body?.port || "",
        "secure": req.body?.secure || "",
        "auth": {
          "user": req.body?.user || "",
          "pass": req.body?.pass || ""
        }
      }
      if (!ifExist || ifExist.length <= 0) {
        let data: SystemPrefRequest = {
          type: userPrefrencesTypes.emailSmtp,
          value: emailConfigurationsObj,
          userId: getUser.userId
        }
        let createPref = await create(data);
        if (createPref) return responseHelper(1, { message: responseMessages.dataCreated.replace("{replace}", "Email configurations") })
        else return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "create Email configurations") })
      } else {
        let data: SystemPrefRequest = {
          value: emailConfigurationsObj,
        }
        let _update = await update({
          type: userPrefrencesTypes.emailSmtp,
          userId: getUser.userId
        }, data);
        if (_update) return responseHelper(1, { message: responseMessages.dataUpdated.replace("{replace}", "Email configurations") })
        else responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "update Email configurations") })
      }
    } else if (url.includes("notification-preferences")) {
      let ifExist = await get({ userId: getUser.userId });
      // type: userPrefrencesTypes.notificationPref
      if (req.body.Email) {
        let findEmailConfigurations = ifExist.find(x => x.type == userPrefrencesTypes.emailSmtp);
        if (!findEmailConfigurations) return responseHelper(0, { message: "You cannot enable email service, please configure the smtp for that" })
      }
      if (req.body.Sms) {
        let findEmailConfigurations = ifExist.find(x => x.type == userPrefrencesTypes.twilloSmsConfiguration);
        if (!findEmailConfigurations) return responseHelper(0, { message: "You cannot enable sms service, please configure the twillo for using that" })
      }
      let notificationValObj = {
        Email: req.body.Email,
        Sms: req.body.Sms,
      }
      ifExist = ifExist.find(x => x.type == userPrefrencesTypes.notificationPref);
      if (!ifExist) {
        let data: SystemPrefRequest = {
          type: userPrefrencesTypes.notificationPref,
          value: notificationValObj,
          userId: getUser.userId
        }
        let createPref = await create(data);
        if (createPref) return responseHelper(1, { message: responseMessages.dataCreated.replace("{replace}", "notification preferences") })
        else return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "create notification preferences") })
      } else {
        let data: SystemPrefRequest = {
          value: notificationValObj,
        }
        let _update = await update({
          type: userPrefrencesTypes.notificationPref,
          userId: getUser.userId
        }, data);
        if (_update) return responseHelper(1, { message: responseMessages.dataUpdated.replace("{replace}", "notification preferences") })
        else return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "update notification preferences") })
      }
    } else if (url.includes("twillo-sms-configurations")) {
      let ifExist = await getOnce({ type: userPrefrencesTypes.twilloSmsConfiguration, userId: getUser.userId });
      let twilioConfigurationsObj: twilioConfigReuquest = {
        accountSid: await encrypt(req.body.accountSid),
        authToken: await encrypt(req.body.authToken),
        fromPhone: await encrypt(req.body.fromPhone)
      }
      if (!ifExist || ifExist.length <= 0) {
        let data: SystemPrefRequest = {
          type: userPrefrencesTypes.twilloSmsConfiguration,
          value: twilioConfigurationsObj,
          userId: getUser.userId
        }
        let createPref = await create(data);
        if (createPref) return responseHelper(1, { message: responseMessages.dataCreated.replace("{replace}", "Twilio configurations") })
        else return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "create Twilio configurations") })
      } else {
        let data: SystemPrefRequest = {
          value: twilioConfigurationsObj,
        }
        let _update = await update({
          type: userPrefrencesTypes.twilloSmsConfiguration,
          userId: getUser.userId
        }, data);
        if (_update) return responseHelper(1, { message: responseMessages.dataUpdated.replace("{replace}", "Twilio configurations") })
        else responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "update twilio configurations") })
      }
    }
  } catch (error) {
    let response = catchResponseHelper(error);
    return response;
  }
}