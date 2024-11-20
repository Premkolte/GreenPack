const mongoose = require("mongoose");

const bagSchema = mongoose.Schema({
    qrcode: {type: String, unique: true, required: true},
    status: {type: String, default: "available"}, //e.g., 'available', 'in-use', 'returned' ,'damaged' 
    conditionScore: {type: Number, default:100},
    lifecycle: [{event: String, date:{type: Date, default: Date.now()}}],
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
});

const Bag = mongoose.model('Bag', bagSchema);
module.exports = Bag;