const mongoose = require("mongoose");

const lecturaSchema = new mongoose.Schema({
  temperatura: Number,
  humedad: Number,

  imagen_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Lectura", lecturaSchema);
