import logger from "../presentation/middleware/logger";

export const responseHelper = (status: Number = 0, data: any = null, additionalMessage: string = '') => {
    const responseConstant = {
        status: status,
        data: data,
        additonalMessage: additionalMessage,
    }
    return responseConstant;
}

export const catchResponseHelper = (error: any) => {
    console.log(error);
    let errorMessage: string = error?.message;
    logger.error(errorMessage);
    return responseHelper(0, { message: errorMessage }, errorMessage);
}

