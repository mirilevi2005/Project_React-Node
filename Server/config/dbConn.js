const mongoose=require('mongoose')

const connectDB = async () => {
try {
await mongoose.connect(process.env.CONECTION_URL)
} catch (err) {
    console.log(process.env.CONECTION_URL);
    
console.error("*****error connection to DB****\n" + err)

}
}
module.exports = connectDB