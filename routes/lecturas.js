const express = require("express");
const router = express.Router();
const Lectura = require("../models/lectura");

router.get("/ultimas", async (req, res) => {
  try {
    const lecturas = await Lectura
      .find()
      .sort({ fechaHora: -1 })
      .limit(3);

    res.json(lecturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener lecturas" });
  }
});

router.get("/todas", async (req, res) => {
  try {
    const lecturas = await Lectura
      .find()
    res.json(lecturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener lecturas" });
  }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await Lectura.findByIdAndDelete(id);

        if (!eliminado) {
            return res.status(404).json({ message: "Lectura no encontrada" });
        }

        res.json({ message: "Lectura eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/:id", async (req, res) => {
  try {
    const lectura = await Lectura.findById(req.params.id);

    if (!lectura) {
      return res.status(404).json({ message: "Lectura no encontrada" });
    }

    res.json(lectura);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "ID inválido" });
  }
});

module.exports = router;
