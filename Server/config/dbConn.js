const mongoose=require('mongoose')

const connectDB = async () => {
try {
await mongoose.connect(process.env.CONECTION_URL)
} catch (err) {
console.error("*****error connection to DB****\n" + err)
}
}
module.exports = connectDB