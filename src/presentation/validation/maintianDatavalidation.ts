import Joi from 'joi';
import { queueTypesNames } from '../../utils/constant';

export const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[a-z])')).message('Password must contain at least one lowercase letter')
        .pattern(new RegExp('(?=.*[A-Z])')).message('Password must contain at least one uppercase letter')
        .pattern(new RegExp('(?=.*\\d)')).message('Password must contain at least one number')
        .pattern(new RegExp('(?=.*[!@#$%^&*])')).message('Password must contain at least one special character')
        .required()
});
export const updateUserSchema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
});
export const userisActivationSchema = Joi.object({
    id: Joi.number().required(),
    IsActive: Joi.boolean().required(),
});
export const userVerificationSchema = Joi.object({
    email: Joi.string().required(),
    otp: Joi.number().required(),
});
export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
export const emailTemplateSchema = Joi.object({
    typeId: Joi.number().required(),
    content: Joi.string().required(),
    subject: Joi.string().required(),
});
export const ItemOneSchema = Joi.object({
    name: Joi.string().required(),
}).unknown(true);
export const RoleSchema = Joi.object({
    name: Joi.string().required(),
}).unknown(true);
export const UpdateRoleSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
}).unknown(true);
export const AssignRoleSchema = Joi.object({
    roleIds: Joi.array().required(),
    userId: Joi.number().required(),
}).unknown(false);
export const AssignRolePermissionSchema = Joi.object({
    roleId: Joi.string().required(),
    claims: Joi.array().required(),
}).unknown(false);
export const EmailConfSystemPrefSchema = Joi.object({
    service: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required(),
    secure: Joi.string().required(),
    user: Joi.string().required(),
    pass: Joi.string().required(),
}).unknown(false);
export const NotificationPrefSchema = Joi.object({
    Email: Joi.boolean().required(),
    Sms: Joi.boolean().required(),
}).unknown(false);

export const NotificationSchema = Joi.object({
    notificationType: Joi.string()
        .valid(
            queueTypesNames.confirmationNotification,
            queueTypesNames.informationNotification,
            queueTypesNames.sensitiveNotification
        )
        .required(),
    message: Joi.string().min(1).required(),
    subject: Joi.string().optional(),
    recipients: Joi.object().keys({
        email: Joi.string().email().allow('').optional(),
        phone: Joi.string().pattern(/^\+\d{10,15}$/).allow('').optional()
    }).custom((value, helpers) => {
        const { email, phone } = value;
        const emailValid = email && email.trim() !== '';
        const phoneValid = phone && phone.trim() !== '';

        if (!emailValid && !phoneValid) {
            return helpers.error('any.required');  // At least one must be provided
        }
        return value;  // Return the value if validation passes
    }).required()  // Ensure recipients is a required field
}).unknown(false);
export const TwilioPrefSchema = Joi.object({
    accountSid: Joi.string().required(),
    authToken: Joi.string().required(),
    fromPhone: Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be in international format (e.g., +123456789) and up to 15 digits long.",
      }),
  }).unknown(false);
