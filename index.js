
const app = require('./src/app/app')

const port = process.env.PORT || 8080;

app.listen(port, ()=> console.log(`Server conectado y corriendo en el puerto ${port}`))