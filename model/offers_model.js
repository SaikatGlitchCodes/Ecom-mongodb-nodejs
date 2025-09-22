const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    validTill: { type: Date, required: true },
    backgroundImg: { type: String, required: true },
    btnText: { type: String, required: true },
    btnAction: { type: String, required: true },
    direction: { type: String, enum: ['left', 'right'], required: true, default: 'left' }
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;