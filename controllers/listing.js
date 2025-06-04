const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.show = async(req,res)=>{
    let {id} = req.params;
    const data = await Listing.findById(id)
    .populate({path : "reviews",populate:{path : "author"}})
    .populate("owner");
    //console.log(data);
    if(!data){
        req.flash("error","listing doesn't exist");
        res.redirect("/listings");
    }
    else {
        // console.log(data);
        res.render("listings/show.ejs",{data});
    }
};

module.exports.createListing = async (req,res)=>{
    let coordinates = await geocodingClient.forwardGeocode({
     query: req.body.listing.location,
      limit: 1
    })
    .send();
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = new Listing(req.body.listing);
    if(!listing) throw new ExpressError(400,"Bad request");
    listing.owner = req.user._id;
    listing.img = {url,filename};
    listing.geometry = coordinates.body.features[0].geometry;
    let data = await listing.save();
    console.log(data);
    req.flash("success","new listing added");
    res.redirect("/listings");
};

module.exports.edit = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    //console.log(listing);
    if(!listing){
        req.flash("error","listing doesn't exist");
        res.redirect("/listings");
    }else {
        let originalImageUrl = listing.img.url;
        originalImageUrl= originalImageUrl.replace("/upload","/upload/h_250,w_250");
        console.log(originalImageUrl);
        res.render("listings/edit.ejs",{listing,originalImageUrl});
    }
    
};

module.exports.newListing = async (req,res)=>{
         res.render("listings/new.ejs");
}
module.exports.updateListing = async (req,res)=>{
         let {id} = req.params;
         let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
         if(typeof(req.file)!=="undefined"){
            let url = req.file.path;
            let filename = req.file.filename;
            listing.img = {url,filename};
            await listing.save();
         }
         
         req.flash("success","listing updated");
         res.redirect(`/listings/${id}`);
   
};

module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted");
    res.redirect("/listings");
};