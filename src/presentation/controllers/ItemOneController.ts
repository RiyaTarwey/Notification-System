import { createItem, deleteItem, getItem, getItems, updateItem } from "../../application/services/ItemOneService";
import { catchResponseHelper } from "../../helpers/response"

export const create = async (req: any, res: any) => {
    try {
        let creation = await createItem(req);
        res.json(creation);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}
export const get = async (req: any, res: any) => {
    try {
        let items = await getItems(req);
        res.json(items);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}
export const getById = async (req: any, res: any) => {
    try {
        let items = await getItem(req);
        res.json(items);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}
export const update = async (req: any, res: any) => {
    try {
        let item = await updateItem(req);
        res.json(item);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}
export const destroy = async (req: any, res: any) => {
    try {
        let item = await deleteItem(req);
        res.json(item);
    } catch (error) {
        let err = catchResponseHelper(error);
        res.json(err);
    }
}