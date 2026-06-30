const USER_STATUS={
    approved:"APPROVED",
    pending:"PENDING",
    rejected:"REJECTED"
}
const USER_TYPE={
    customer:"CUSTOMER",
    admin:"ADMIN",
    client:"CLIENT"
}
const STATUS={
    OK:200,
    INTERNAL_SERVER_ERROR:500,
    CREATED:201,
    UNAUTHORIZED:401,
    NOT_FOUND:404,
    BAD_REQUEST:400,
    FORBIDDEN:403,
    UNPROCESSABLE_ENTITY:422
}
const BOOKING_STATUS={
    cancelled:"CANCELLED",
    successfull:"SUCCESSFULL",
    processing:"IN_PROCESS"
}
const PAYMENT_STATUS={
    success:"SUCCESS",
    failed:"FAILED",
    pending:"PENDING"
}
module.exports={USER_STATUS,USER_TYPE,STATUS,BOOKING_STATUS,PAYMENT_STATUS}