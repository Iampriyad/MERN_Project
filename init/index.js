const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("connected successfully");
}).catch((err)=>{console.log(err)});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/airnb');
}

const initDb = async () =>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"683d5a28c11547c869fc57fe"})),
    await Listing.insertMany(initdata.data);
    console.log("Data succesfully inserted");
}

initDb();