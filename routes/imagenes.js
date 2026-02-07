const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db,
      { bucketName: "imagenes" }
    );

    const imageId = new mongoose.Types.ObjectId(req.params.id);

    res.set("Content-Type", "image/jpeg");
    bucket.openDownloadStream(imageId).pipe(res);

  } catch (err) {
    res.status(404).json({ error: "Imagen no encontrada" });
  }
});

module.exports = router;
