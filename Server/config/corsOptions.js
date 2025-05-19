
const allowedOrigins = [
    /^http:\/\/localhost:\d+$/, // regex שמאפשר כל פורט בlocalhost
];

const corsOptions = {
    origin: (origin, callback) => {
        console.log('CORS origin:', origin);
        if (!origin) {
            // אם אין origin (לדוגמה בקשות מהשרת עצמו) - אפשר לאפשר
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
