const validator = require("email-validator");
const phoneRegex = /^\d{10}$/;

exports.validateEmail = (email) => {
  return validator.validate(email);
};

exports.validatePhoneNumber = (number) => {
  number += "";
  if (number.match(phoneRegex)) return true;
  else return false;
};
