import { getUserPreferences, preferencesTypes, updateUserPreferences } from "../../application/services/SystemPreferences";
import { catchResponseHelper } from "../../helpers/response";

export const update = async (req:any,res:any) => {
    try {
        let _update = await updateUserPreferences(req);
        res.json(_update)
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const getTypes = async (req:any,res:any) => {
    try {
        let types = await preferencesTypes();
        res.json(types)
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const get = async (req:any,res:any) => {
    try {
        let pref = await getUserPreferences(req);
        res.json(pref)
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}