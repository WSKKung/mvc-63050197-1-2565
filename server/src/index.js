import express from "express"
import cors from "cors"
import helmet from "helmet"
import router from "./routes/router.js"

const app = express()
const port = 4000

app.use(cors())
app.use(helmet())
app.use(router)

app.listen(port, () => {
	console.log(`Server running on: http://localhost:${port}`)
})