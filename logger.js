const parseHeaders = headers => {
    for (var key in headers) {
        if (headers.hasOwnProperty(key)) {
            console.info(` ${key} -> ${headers[key]}`);
        }
    }
};

const logRequests = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`);
    console.info('HEADERS: ');
    parseHeaders(req.headers)

    res.on('finish', () => {
        console.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
    })

    next();
};

module.exports = logRequests;