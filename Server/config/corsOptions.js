
const allowedOrigins = [
    /^http:\/\/localhost:\d+$/, 
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        }

        const isAllowed = allowedOrigins.some((regex) => regex.test(origin));

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
