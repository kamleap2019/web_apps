const validUrl = require("valid-url");
const isEmpty = require("./is-empty");

const validateBaseUrl = url => {
  let error = {};

  if (!validUrl.isUri(url)) {
    error.text = "Invalid base url";
  }

  return {
    error,
    isBaseValid: isEmpty(error)
  };
};

module.exports = validateBaseUrl;
