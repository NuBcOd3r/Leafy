const express = require("express");
const router = express.Router();
const Lectura = require("../models/lectura");

router.get("/ultimas", async (req, res) => {
  try {
    const lecturas = await Lectura
      .find()
      .sort({ createdAt: -1 })
      .limit(3);

    res.json(lecturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener lecturas" });
  }
});

module.exports = router;
