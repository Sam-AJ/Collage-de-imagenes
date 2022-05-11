const express = require('express');
const app = express();
const fileupload = require('express-fileupload')
const fs = require('fs')

app.listen(3000, () => console.log("Servidor activo http://localhost:3000"));

app.use(express.json());
app.use("/imgs", express.static(`${__dirname}/img`));

app.use(fileupload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "EL archivo supera el límite permitido"
}));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/formulario.html`);
});

app.get("/imagen", (req, res) => {
    res.sendFile(`${__dirname}/collage.html`);
});

app.post("/imagen", (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;
    target_file.mv(`${__dirname}/img/imagen-${posicion}.jpg`, (err) => {
        res.send(err ? 'Ocurrió un error subiendo archivo' : 'Archivo almacenado con éxito')
    });
});


app.get("/deleteImg/:nombre", (req, res) => {
    let nombre = req.params.nombre
    fs.unlink(`${__dirname}/img/${nombre}`, (err) => {
        res.send(err ? 'Ha ocurrido un error' : 'Imagen eliminada con éxito');
    });
});