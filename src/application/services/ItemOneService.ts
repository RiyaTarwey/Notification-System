import { create, deleteItems, get, getById, update } from "../../data-access/repositories/itemOneRepository";
import { dbUploadEntry, deleteFiles, deleteSelectedFiles, getFiles, getSingleFile } from "../../helpers/fileManager";
import { catchResponseHelper, responseHelper } from "../../helpers/response";
import { ItemOneRequest } from "../../presentation/interfaces/request/ItemOne";
import { fileContants, responseMessages } from "../../utils/constant";


export const createItem = async (req: any) => {
    try {
        let response;
        let body: ItemOneRequest = {
            name: req.body.name,
        };
        let files = req.files.docs || [];
        let creation = await create(body);
        if (creation) {
            if (files && files.length > 0) {
                for (const file of files) {
                    await dbUploadEntry(
                        creation.id,
                        fileContants.Item,
                        file.filename,
                    );
                    // console.log(file);
                }
            }
            response = responseHelper(1, { message: responseMessages.dataCreated.replace("{replace}", "Item") });
        }
        else
            response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "create item") });
        return response;
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

export const getItems = async (req: any) => {
    try {
        let response;
        let items = await get(req.body || {});
        let itemsWithFiles = await getFiles(
            items,
            fileContants.Item
        );
        response = responseHelper(1, itemsWithFiles);
        return response
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}
export const getItem = async (req: any) => {
    try {
        let response;
        let item = await getById(req.params.id);
        let itemWithFiles = await getFiles(
            [item],
            fileContants.Item
        );
        itemWithFiles = itemWithFiles.find(x => x.id == req.params.id);
        response = responseHelper(1, itemWithFiles);
        return response
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}


export const updateItem = async (req: any) => {
    try {
        let response;
        let id = req.body.id;
        let body: ItemOneRequest = {
            name: req.body.name,
        };
        let files = req.files.docs || [];
        let item = await getById(id);
        if (!item)
            return response = responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "Item") });
        let creation = await update({ id: id }, body);
        if (creation) {
            if (req.body?.deletedFiles && req.body?.deletedFiles?.length > 0) {
                await deleteSelectedFiles(req.body?.deletedFiles);
            }
            if (files && files.length > 0) {
                for (const file of files) {
                    await dbUploadEntry(
                        id,
                        fileContants.Item,
                        file.filename,
                    );
                    // console.log(file);
                }
            }
            response = responseHelper(1, { message: responseMessages.dataUpdated.replace("{replace}", "Item") });
        }
        else
            response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "update item") });
        return response;
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

export const deleteItem = async (req: any) => {
    try {
        let id = req.params.id;
        let item = await getById(id);
        let response;
        if (!item)
            return response = responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "Item") });
        let _deleteFiles = await deleteFiles(fileContants.Item, id);
        if (_deleteFiles) {
            let _deleteItem = await deleteItems({ id: id });
            if (_deleteItem > 0) {
                return response = responseHelper(1, { message: responseMessages.success.replace("{replace}", "Item Deleted") });
            } else
                return response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "while delete this item") });
        } else
            return response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "while delete files of this item") });
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;

    }
}