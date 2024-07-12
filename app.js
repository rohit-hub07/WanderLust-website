const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const MONGO_URL = "mongodb://127.0.0.1:27017/Batman";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsMate);

app.get("/", (req, res) => {
  res.send("This is the root.");
});

app.get("/listings", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new",(req,res)=>{
  res.render("listings/create.ejs");
});

//create route
app.post("/listings",async (req,res)=>{
 const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});


//Show Route
app.get("/listings/:id",async (req,res)=>{
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
});

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
  
});

//Update Route
app.put("/listings/:id", async (req,res)=>{
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`)
});

//Delete Route
app.delete("/listings/:id",async (req,res)=>{
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});


// app.get('/listings/:id/edit',(req,res)=>{
//   let { id } = req.params;
//   res.render("listings/edit.ejs",{id});
// })
// app.get("/testListing",async (req,res)=>{
//   let sampleList = new Listing({
//     title: "Home Vibe",
//     description: "Home in Heaven",
//     image: "",
//     price: 90000,
//     location: "Guwahati",
//     country: "India",
//   });
// await sampleList.save();
//   res.send("Succesful!!");
// });

app.listen(8080, (req, res) => {
  console.log("connection succesful");
});
