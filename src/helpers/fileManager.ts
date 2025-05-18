import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import FileRepo from "../domain/models/fileRepo";

export const fileUpload = (type: any) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = "public/files/uploads/" + type;
            fs.mkdir(uploadPath, { recursive: true }, (err) => {
                if (err) {
                    console.error("Error creating upload directory:", err);
                } else {
                    cb(null, uploadPath);
                }
            });
        },
        filename: function (req, file, cb) {
            crypto.randomBytes(12, (error, bytes) => {
                const fn =
                    bytes.toString("hex") +
                    "^^^" +
                    file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
                cb(null, fn);
            });
        },
    });
};

export const dbUploadEntry = async (refId: number, refTableName: string, fileName: string) => {
    const newFile = new FileRepo({
        refId: refId,
        refTableName: refTableName,
        path: fileName,
    });
    await newFile.save();
};

export const updateFile = async (refId: number, refTableName: string, req: any) => {
    try {
        const whereClause = { refId, refTableName };

        const existingFile = await FileRepo.findOne({
            where: whereClause,
        });

        if (existingFile) {
            const filePath = "public/files/uploads/" + refTableName + "/" + existingFile.path;

            // Check if the file exists before attempting to delete
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Delete the file
            }

            existingFile.path = req?.file ? req?.file?.filename : req.filename;
            await existingFile.save();
        } else {
            const newFile = new FileRepo({
                refId,
                refTableName,
                path: req?.file ? req?.file?.filename : req.filename,
            });
            await newFile.save();
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteFiles = async (refTableName: string, refId: number) => {
    try {
        // Find and delete associated files
        const files = await FileRepo.find({
            where: { refId: refId, refTableName: refTableName },
        });
        for (const file of files) {
            fs.unlinkSync(
                "public/files/uploads/" + file.refTableName + "/" + file.path
            );
            await FileRepo.deleteMany({ where: { id: file.id } });
        }
        return true
    } catch (error: any) {
        throw new Error(error.message);
    }
};
export const deleteSelectedFiles = async (ids = []) => {
    try {
        const files = await FileRepo.find({
            where: { id: ids },
        });

        await Promise.all(
            files.map(async (file) => {
                try {
                    if (file.path) {
                        const filePath = `public/files/uploads/${file.refTableName}/${file.path}`;
                        if (fs.existsSync(filePath)) {
                            await fs.promises.unlink(filePath);
                        }
                    }
                    await FileRepo.deleteMany({ where: { id: file.id } });
                } catch (error) {
                    console.error("Error deleting file:", error);
                    // Handle specific error scenarios here if needed
                }
            })
        );
    } catch (error: any) {
        console.error("Error deleting files:", error);
        throw new Error(error.message);
    }
};

export const getFiles = async (schemaName: any, refTable: string) => {
    try {
        const data = await Promise.all(
            schemaName.map(async (schema: any) => {
                const allFiles = await FileRepo.find({
                    where: { refTableName: refTable, refId: schema.id },
                });
                let schemaObject = schema.toJSON ? schema.toJSON() : schema; // Convert to JSON if it's a Sequelize instance
                return {
                    ...schemaObject,
                    files: allFiles.map((x) => ({
                        filepath: `/public/files/uploads/${refTable}/${x.path}`,
                        id: x.id,
                    })),
                };
            })
        );
        return data;
    } catch (error: any) {
        throw new Error(`Error fetching files for users: ${error.message}`);
    }
};

export const getSingleFile = async (schemaName: any, refTable: string) => {
    try {
        const data = await Promise.all(
            schemaName.map(async (schema: any) => {
                const allFiles = await FileRepo.findOne({
                    where: { refTableName: refTable, refId: schema.id || schema.Id },
                });

                let schemaObject = schema.toJSON ? schema.toJSON() : schema;

                let files = null; // Initialize files as null

                if (Array.isArray(allFiles) && allFiles.length > 0) {
                    // If allFiles is an array and not empty, get the first file
                    const firstFile = allFiles[0];
                    files = `/public/files/uploads/${refTable}/${firstFile.path}`;
                } else if (allFiles) {
                    files = `/public/files/uploads/${refTable}/${allFiles.path}`;
                }

                let obj = { ...schemaObject };
                obj[refTable] = files;

                return obj;
            })
        );
        return data;
    } catch (error: any) {
        throw new Error(`Error fetching files for users: ${error.message}`);
    }
};