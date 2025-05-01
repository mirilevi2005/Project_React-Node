
// const allowedOrigins = [
//     'http://localhost:5000',
//     'http://localhost:8080',
//     'http://localhost:5174',
//     'http://localhost:5173',
//     'http://localhost:3000',
//     'http://127.0.0.1:8080' ,
//     'http://127.0.0.1:3000' 
// ]

// const corsOptions = {
//     origin: (origin, callback) => {
//         console.log('CORS origin:', origin);  // הוספת לוג של ה-origin
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200
// };


// module.exports = corsOptions 














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
