import joi from "joi";

const registerUserSchema = joi.object({
  username: joi.string().alphanum().min(5).required().trim().message({}),
  password: joi
    .string()
    // Most common secure Regex for passwords, copy pasted but added "_": https://uibakery.io/regex-library/password
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/)
    .required()
    .trim()
    .message({
      "string.empty": "The Password field cannot be empty",
      "string.pattern.base": "The Password is incorrect.",
      "any.required": "The Password field is required",
    }),
  // prettier-ignore
  email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr', 'io' ] } }).required().empty().trim().message({
    "string.empty": "Email field is Empty",
    "string.email": "Wrong Email format ...",
    "any.required": "The field Email is missing !"
  }),
  // Email verif explanation[ minDomainSegments: 2 => gmail.com par example, tlds: {} => last word of the domain (after the dot " . ") like com / net ... ]
});

export { registerUserSchema };