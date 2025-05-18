import dotenv from "dotenv";
dotenv.config();

export const responseMessages = {
    inUse: "{replace} in use",
    userCreated: "User has been created",
    dataCreated: "{replace} has been created",
    dataUpdated: "{replace} has been updated",
    notFound: "{replace} not found",
    alreadyExist: "{replace} Already Exist",
    wentWrongWhile: "Something went wrong while {replace}",
    incCorrect: "Incorrect {replace}",
    success: "{replace} successfully",
    isReuired: "{replace} is Required",
}
export const general = {
    jwtKey: process.env.JWT_SECRET_KEY || "A@#&*^%GHSF@FH!"
}

export const emailTemplateTypes = {
    sendOtp: "Send Otp",
};

export const emailTemplateTypesEnum = [
    {
        id: 1,
        name: 'Send Otp',
        tokens: [
            "{Otp}",
            "{Username}",
        ]
    }
]

export const emailConfigurations = {
    "EmailCongigurations": {
        "service": process.env.SERVICE,
        "host": process.env.HOST,
        "port": Number(process.env.SMTP_PORT), // Port should be a number
        "secure": process.env.SECURE === "SSL", // Convert "SSL" to true for the secure field
        "auth": {
            "user": process.env.SMTP_USER,
            "pass": process.env.SMTP_PASSWORD
        }
    },
    "CC": [
        "md.farooq.ansari8959149@gmail.com"
    ]
};

export const fileContants = {
    Item: "Items",
};

export const permanentRoles = {
    Admin: "Admin",
    notificationConsumer: "Notification Consumer"
}
export const claims = {
    createItemOne: "Create Item One",
    updateItemOne: "Update Item One",
    ViewItemOne: "View Item One",
    deleteItemOne: "Delete Item One",
    updateCongigurations: "Update System Preferences",
    createRole: "Create Role",
    updateRole: "Update Role",
    ViewRole: "View Role",
    deleteRole: "Delete Role",
    assignRole: "Assign Role",
    assignRolePermission: "Assign Role Permission",
    createUser: "Create User",
    updateUser: "Update User",
    ViewUser: "View User",
}

export const notificationConsumerPermissions: string[] = [
    claims.updateCongigurations
]
export const adminPermissions: string[] = [
    claims.createItemOne,
    claims.updateItemOne,
    claims.ViewItemOne,
    claims.deleteItemOne,
    claims.createRole,
    claims.updateRole,
    claims.deleteRole,
    claims.ViewRole,
    claims.assignRole,
    claims.assignRolePermission,
]

export const queueTypesNames = {
    notifyOtpEmail: "NOTIFY_OTP_EMAIL",
    confirmationNotification: "Confirmation_notification",
    informationNotification: "Information_eotification",
    sensitiveNotification: "Sensitive_notification",
    promotionalNotification: "Promotional_notification",
    logPrecessedJobQueue: "Proccesed_Job_Queue",
}
export const queueName = {
    notifyOnEmailWhileTokenIssuedToInv: "Notify Investor while his tokens issued",
}

export const queueTypes: any[] = [
    {
        id: 1,
        name: queueTypesNames.notifyOtpEmail,
        priority: 1,
        chunk: 10
    },
    {
        id: 2,
        name: queueTypesNames.sensitiveNotification,
        priority: 1,
        chunk: 6
    },
    {
        id: 3,
        name: queueTypesNames.confirmationNotification,
        priority: 2,
        chunk: 6
    },
    {
        id: 4,
        name: queueTypesNames.informationNotification,
        priority: 3,
        chunk: 6
    },
    {
        id: 5,
        name: queueTypesNames.logPrecessedJobQueue,
        priority: 1,
        chunk: 50
    },
    {
        id: 6,
        name: queueTypesNames.promotionalNotification,
        priority: 4,
        chunk: 8
    },
]
export const kafkaMaintopicsNames = {
    transaction: "Transactional_Messages",
    promotional: "Promotional_Messages",
    logPrecessedJobQueue: "Proccesed_Job_Queue",
}
export const kafkaMaintopics = [
    {
        topic: queueTypesNames.notifyOtpEmail,
        numPartitions: 1
    },
    {
        topic: kafkaMaintopicsNames.transaction,
        numPartitions: 4
    },
    {
        topic: kafkaMaintopicsNames.promotional,
        numPartitions: 1
    },
    {
        topic: kafkaMaintopicsNames.logPrecessedJobQueue,
        numPartitions: 3
    }
]

export const userPrefrencesTypes = {
    notificationPref: "Notification_Preferences",
    emailSmtp: "Email_Configurations",
    twilloSmsConfiguration: "Twillo_Sms_Configurations",
}

export const PrefTypesArr = [
    userPrefrencesTypes.emailSmtp,
    userPrefrencesTypes.notificationPref
]

export const exportBullQueueNames = {
    Email: "Email",
    Sms: "Sms"
}

export const queueStatus = {
    InQueue: "In Queue",
    InProcess: "In Process",
    Completed: "Completed",
    Failed: "Failed"
}

