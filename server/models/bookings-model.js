const mongoose = require('mongoose');



const bookingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms', 
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branches', 
        required: true
    },
    roomPrice: {
        type: Number,
        required: true
    },
    foodPrice: {
        type: Number,
        required: false,
    },
    laundaryPrice: {
        type: Number,
        required: false,
    },
    totalAmmount: {
        type: Number,
        required: true
    },
    
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
