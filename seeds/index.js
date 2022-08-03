const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i< 200; i++){
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '62c0a896f35c1b4926a5a208',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/yelp-camp-storage/image/upload/v1657421239/YelpCamp-img/m0ayosog9gdog5k5h6dk.jpg',
                    filename: 'YelpCamp-img/m0ayosog9gdog5k5h6dk.jpg',
                },
                {
                    url: 'https://res.cloudinary.com/yelp-camp-storage/image/upload/v1657427622/YelpCamp-img/index2_nvzxer.jpg',
                    filename: 'YelpCamp-img/index2_nvzxer.jpg',
                }
            ],
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, illum odio. Autem adipisci minima a esse deleniti totam suscipit! Quis cum expedita alias facere dicta ullam unde corrupti recusandae debitis",
            price
        })
        await camp.save();
    }

}

seedDB().then(() => {
    console.log("Data saved\nConnection Closed")
    mongoose.connection.close();
})