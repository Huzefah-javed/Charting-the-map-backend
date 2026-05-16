export function error(err, req, res, next) {
    const status = err.status || 500;
    const msg = err.msg ||  "An unknown error occurred.";

    return res.status(status).json({
        success: false,
        message: msg,
    });
}