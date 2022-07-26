const mongoose = require('mongoose');

const connect = async () => {

    try{
        
        await mongoose.connect(process.env.DATA_BASE_URL, );
        console.log('MongoDB connected');
    }catch(error){

        console.log(error.message,'Error connecting to MongoDB');

    }
}

module.exports = connect;