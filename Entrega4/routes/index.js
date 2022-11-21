const productos = require('../components/productos/index')

module.exports = app => {
    productos(app);
    app.use("/", (req, res, next) => {
        res.send("ok")
    });

}