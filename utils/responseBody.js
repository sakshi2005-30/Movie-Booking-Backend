// This object is used for creating error reponses
const errorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong,cannot process the request",
  success: false,
};
// This object is used for creating success reponses
const successResponseBody = {
  err: {},
  data: {},
  message: "Successfully processes the request",
  success: true,
};

module.exports={errorResponseBody,successResponseBody}