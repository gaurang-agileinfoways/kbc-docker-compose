import * as Joi from "joi";
const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/; // nosonar

export const LoginVelidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(60)
    .message("maximum 60 characters allowed."),
  password: Joi.string()
    .regex(strongPasswordRegex)
    .message("password pattern must be match!")
    .min(8)
    .message("minimum 8 characters required.")
    .max(16)
    .message("maximum 16 characters allowed."),
}).required();

export const SignupVelidation = Joi.object({
  firstName: Joi.string().required().max(20).messages({
    "string.empty": `First name is required.`,
    "string.max": `First name should have a maximum length of {#limit}`,
    "any.required": `First name is required.`,
  }),
  lastName: Joi.string().required().max(20).messages({
    "string.empty": `Last name is required.`,
    "string.max": `Last name should have a maximum length of {#limit}`,
    "any.required": `Last name is required.`,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .max(60)
    .messages({
      "string.empty": `Email is required.`,
      "string.max": `Email should have a maximum length of {#limit}`,
      "any.required": `Email is required.`,
      "string.email": `Email should have valid format.`,
    }),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": `Phone number is required.`,
      "string.length": `Invalid phone number.`,
      "any.required": `Phone number is required.`,
      "string.pattern.base": `Phone number must have 10 digits.`,
    }),
  password: Joi.string()
    .required()
    .pattern(strongPasswordRegex)
    .min(8)
    .max(16)
    .messages({
      "string.empty": `Password is required.`,
      "string.length": `Password should have a maximum length of {#limit}`,
      "any.required": `Password is required.`,
      "string.pattern.base": `Password pattern must me match.`,
    }),
  conformPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": `Password is required.`,
    "any.only": `Password must me match.`,
  }),
});
