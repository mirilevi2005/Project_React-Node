
const allowedOrigins = [
    'http://localhost:5000',
    'http://localhost:8080',
    'http://localhost:5174',
    'http://localhost:5173' 

]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 