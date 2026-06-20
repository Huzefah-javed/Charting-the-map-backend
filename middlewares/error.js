export function error(err, req, res, next) {
    const status = err.status || err.statusCode || 500;
    const message = err.msg || err.message ||  "An unknown error occurred.";

    if(err.isOperational){
    return res.status(status).json({success:false, message})
    }

    return res.status(status).json({
        success: false,
        status:500,
        message: "Something went wrong",
    });
}