const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const lecturaSchema = new mongoose.Schema({
  _id: ObjectId,
  temperatura: Number,
  humedad: Number,

  imagen_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  fechaHora: {
    type: Date
  }
});

module.exports = mongoose.model("Lectura", lecturaSchema);
