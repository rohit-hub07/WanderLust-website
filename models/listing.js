const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
      type: String,
    default: "https://images.app.goo.gl/1HQbsJ9ay5FgrTcn9",
    set: (v)=> v === ""? "https://images.app.goo.gl/1HQbsJ9ay5FgrTcn9":v,
  },
  price: Number,
  location: String,
  country: String,
});
const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;