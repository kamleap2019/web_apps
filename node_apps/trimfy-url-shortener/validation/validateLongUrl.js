const validUrl = require("valid-url");
const isEmpty = require("./is-empty");

const validateLongUrl = url => {
  let errors = {};

  if (!validUrl.isUri(url)) {
    errors.text = "Invalid url";
  }

  if (isEmpty(url)) {
    errors.text = "Url field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLongUrl;
