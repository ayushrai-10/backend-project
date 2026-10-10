class ApiError extends Error{
constructor(
    statusCode,
    message= "something went wrong",
    error = [],
    stack ="",



){
    super(message)
    this.statuscode = this.statuscode
    this.message = message
    this.error = error
    this.data = data
    this.stack = stack

}}

export {ApiError}