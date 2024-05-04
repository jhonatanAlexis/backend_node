const express = require("express")
const colors = require("colors")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(express.json()) 
app.use(express.urlencoded({ 
    extended: false
}))

app.use("/api/edad", require("./routes/edadesRoutes"))
app.use("/api/horario", require("./routes/horariosRoutes"))
app.use("/api/tipo", require("./routes/tiposRoutes"))
app.use("/api/dia", require("./routes/diasRoutes"))
app.use("/api/reviews", require("./routes/reviewRoutes"))
app.use("/api/memberships", require("./routes/membershipRoutes"))
app.use("/api/noticias", require("./routes/noticiaRoutes"))
app.use("/api/registros", require("./routes/registroRoutes"))

app.use(errorHandler)

app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto ${port}`)
})