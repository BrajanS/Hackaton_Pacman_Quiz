import joi from "joi";

const registerUserSchema = joi.object({
  username: joi.string().alphanum().min(5).required().empty().trim().messages({
    "string.empty": "The Username field cannot be empty",
    "string.alphanum":
      "Username can only be characters from 'a' to 'Z' and numbers between 0-9",
    "string.min": "The Username needs to be at least 5 characters long",
    "any.required": "The Username field is required",
  }),
  password: joi
    .string()
    .min(8)
    // Most common secure Regex for passwords, copy pasted but added "_": https://uibakery.io/regex-library/password
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/)
    .required()
    .trim()
    .messages({
      "string.empty": "The Password field cannot be empty",
      "string.min": "The password needs to be at least 8 characters long",
      "string.pattern.base":
        "The Password needs contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and one special character (#?!@$%^&*-_).",
      "any.required": "The Password field is required",
    }),
  firstname: joi
    .string()
    .pattern(/^[\p{L}]+$/u)
    .required()
    .empty()
    .trim()
    .messages({
      "string.empty": "The Firstname field is empty",
      "string.pattern.base": "Only Letters are allowed",
      "any.required": "The firstname field is required",
    }),
  lastname: joi
    .string()
    .pattern(/^[\p{L}]+$/u)
    .required()
    .empty()
    .trim()
    .messages({
      "string.empty": "The Lastname field is empty",
      "string.pattern.base": "Only Letters are allowed",
      "any.required": "The field lastname is required",
    }),
  // prettier-ignore
  email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr', 'io' ] } }).required().empty().trim().messages({
    "string.empty": "Email field is Empty",
    "string.email": "Wrong Email format ...",
    "any.required": "The field Email is missing !"
  }),
  // Email verif explanation[ minDomainSegments: 2 => gmail.com par example, tlds: {} => last word of the domain (after the dot " . ") like com / net ... ]
});

const loginUserSchema = joi.object({
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr", "io"] },
    })
    .required()
    .empty()
    .trim()
    .messages({
      "string.empty": "Email field is Empty",
      "string.email": "Wrong Email format ...",
      "any.required": "The field Email is missing !",
    }),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/)
    .required()
    .empty()
    .trim()
    .messages({
      "string.empty": "The Password field cannot be empty",
      "string.min": "The password needs to be at least 8 characters long",
      "string.pattern.base":
        "The Password needs contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and one special character (#?!@$%^&*-_).",
      "any.required": "The Password field is required",
    }),
});

export { registerUserSchema, loginUserSchema };
