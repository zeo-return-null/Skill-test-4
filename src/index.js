import app from './app.js'
import https from 'https'
import fs from 'fs'
import { PORT } from "./config.js"
import { client } from "./middleware/redis.client.js"

await client.connect();
console.log("Conectado a Redis");

// https.createServer({
//     key: fs.readFileSync('./src/utils/certs/key.pem'),
//     cert: fs.readFileSync('./src/utils/certs/cert.pem')
// }, app).listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})