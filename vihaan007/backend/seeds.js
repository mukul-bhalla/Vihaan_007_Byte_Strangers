if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();

}

const mongoose = require('mongoose');
const BNB = require('../backend/models/bnbs')
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB Connected !");
    })
    .catch((e) => {
        console.log("Mongo Error");
        console.log(e);
    })

const data = [
    {
        name: "Seaside Shack",
        type: "Beach Hut",
        city: "Goa",
        address: "789 Beachside Avenue, Anjuna",
        distance: "100 meters from the beach",
        photos: ["https://example.com/seaside_shack_exterior.jpg", "https://example.com/seaside_shack_interior.jpg"],
        title: "Quaint Seaside Escape",
        desc: "Experience the simple joys of beachfront living at this cozy hut. With panoramic ocean views and direct access to the sandy shores, it's the perfect spot for a relaxing getaway.",
        rating: 4.3,
        rooms: ["1 Bedroom", "1 Bathroom"],
        cheapestPrice: 50,
        featured: true
    },
    {
        name: "Riverside Retreat",
        type: "Houseboat",
        city: "Goa",
        address: "456 Riverbank Lane, Aldona",
        distance: "On the Chapora River",
        photos: ["https://example.com/riverside_retreat_exterior.jpg", "https://example.com/riverside_retreat_interior.jpg"],
        title: "Tranquil Houseboat Experience",
        desc: "Sail away on a serene journey along the Chapora River aboard this charming houseboat. Enjoy breathtaking views, comfortable accommodations, and a peaceful atmosphere.",
        rating: 4.6,
        rooms: ["2 Bedrooms", "1 Bathroom"],
        cheapestPrice: 120,
        featured: false
    },
    {
        name: "Hilltop Haven",
        type: "Villa",
        city: "Goa",
        address: "101 Cliffside Drive, Arambol",
        distance: "Overlooking the Arabian Sea",
        photos: ["https://example.com/hilltop_haven_exterior.jpg", "https://example.com/hilltop_haven_pool.jpg"],
        title: "Luxurious Cliffside Villa",
        desc: "Perched atop a scenic cliff, this luxurious villa offers breathtaking views of the Arabian Sea. Relax in style with modern amenities, a private pool, and expansive outdoor spaces.",
        rating: 4.9,
        rooms: ["4 Bedrooms", "3 Bathrooms"],
        cheapestPrice: 200,
        featured: true
    },
    {
        name: "Coconut Grove Cottage",
        type: "Cottage",
        city: "Goa",
        address: "234 Coconut Lane, Palolem",
        distance: "Amidst Coconut Groves",
        photos: ["https://example.com/coconut_grove_cottage_exterior.jpg", "https://example.com/coconut_grove_cottage_interior.jpg"],
        title: "Tranquil Coconut Grove Retreat",
        desc: "Escape to this charming cottage nestled amidst lush coconut groves. Enjoy peace and serenity in a natural setting, just a short walk away from Palolem Beach.",
        rating: 4.4,
        rooms: ["2 Bedrooms", "2 Bathrooms"],
        cheapestPrice: 80,
        featured: false
    },
    {
        name: "Jungle Paradise Resort",
        type: "Resort",
        city: "Goa",
        address: "567 Rainforest Road, Mollem",
        distance: "Surrounded by Wildlife Sanctuaries",
        photos: ["https://example.com/jungle_paradise_resort_exterior.jpg", "https://example.com/jungle_paradise_resort_pool.jpg"],
        title: "Sustainable Jungle Retreat",
        desc: "Immerse yourself in the beauty of Goa's rainforests at this eco-friendly resort. Discover abundant wildlife, eco-adventures, and comfortable accommodations amidst nature's splendor.",
        rating: 4.7,
        rooms: ["10 Cottages", "5 Villas", "2 Treehouses"],
        cheapestPrice: 150,
        featured: true
    },

    {
        name: "Desert Oasis Resort",
        type: "Resort",
        city: "Rajasthan",
        address: "789 Sand Dunes Road, Jaisalmer",
        distance: "Amidst Thar Desert",
        photos: ["https://example.com/desert_oasis_resort_exterior.jpg", "https://example.com/desert_oasis_resort_pool.jpg"],
        title: "Luxurious Desert Retreat",
        desc: "Experience the magic of the Thar Desert at this luxurious resort. With traditional Rajasthani architecture, camel safaris, and starlit dinners, it offers an unforgettable desert experience.",
        rating: 4.6,
        rooms: ["10 Tents", "5 Cottages"],
        cheapestPrice: 120,
        featured: true
    },

    {
        name: "Tea Estate Bungalow",
        type: "Bungalow",
        city: "Assam",
        address: "789 Tea Garden Road, Jorhat",
        distance: "Amidst Tea Plantations",
        photos: ["https://example.com/tea_estate_bungalow_exterior.jpg", "https://example.com/tea_estate_bungalow_interior.jpg"],
        title: "Tranquil Tea Estate Retreat",
        desc: "Experience the charm of Assam's tea plantations at this colonial bungalow. Surrounded by lush greenery, it offers serene ambiance, guided tea tours, and a glimpse into Assam's tea culture.",
        rating: 4.7,
        rooms: ["5 Bedrooms", "3 Bathrooms"],
        cheapestPrice: 100,
        featured: true
    }
]
const seedDB = async () => {
    for (let i = 1; i <= 7; i++) {
        const newBnb = new BNB({
            name: data[i].name,
            type: data[i].type,
            city: data[i].city,
            address: data[i].address,
            distance: data[i].distance,
            photos: data[i].photos,
            title: data[i].title,
            desc: data[i].desc,
            rating: data[i].rating,
            rooms: data[i].rooms,
            cheapestPrice: data[i].cheapestPrice,
            featured: data[i].featured,
        })
        await newBnb.save();
    }

}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })
    .catch(e => {
        console.log("Error Closing db")
    })