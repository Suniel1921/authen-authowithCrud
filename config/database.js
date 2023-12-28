const mongoose = require ("mongoose");

const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log(`Database Connected !`);
    }).catch((error)=>{
        console.log(`Database Not Connected !${error}`)
    })
}

module.exports = dbConnect;