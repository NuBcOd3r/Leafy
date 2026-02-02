const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// MidleWare
app.use(express.json());
app.use(express.static("public"));

// EJS (Para Layouts)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Conexión a Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.error(err));

// Rutas de Vistas
app.get("/", (req, res) => {
  res.render("inicio/index", { title: "Login", user: null });
});

app.get("/registro", (req, res) => {
  res.render("inicio/registro", { title: "Registro", user: null });
});

app.get("/home", (req, res) => {
  res.render("principal/home", { title: "Home", user: null });
});

app.get("/monitoreo", (req, res) => {
  res.render("principal/monitoreo", { title: "Monitoreo", user: null });
});

// API´s
const bcrypt = require("bcryptjs");
const Usuario = require("./models/usuario");

app.post("/api/registro", async (req, res) => {
  try {
    const { cedula, nombreCompleto, email, password, role } = req.body;

    if (!cedula || !email || !password ||!role) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const existe = await Usuario.findOne({ cedula });
    if (existe) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      cedula,
      nombreCompleto,
      email,
      password: hashedPassword,
      role
    });

    await usuario.save();

    res.status(201).json({ ok: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no existe" });
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      ok: true,
      role: usuario.role,
      nombre: usuario.nombreCompleto
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en login" });
  }
});

// Servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
