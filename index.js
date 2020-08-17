const express = require("express")
const actionsRouter = require("./routers/actions")
const projectsRouter = require("./routers/projects")


const server = express()
const port = 4000
server.use(express.json())

server.use(logger)
server.use("/api/projects", projectsRouter)
server.use("/api/actions", actionsRouter)


// server.get('/', (req, res) => {
//     res.status(200).json("Hello!")
// })


// logger middleware
function logger(req, res, next) {
    const time = new Date().toISOString()
    console.log(`${time} ${req.method} ${req.url}`)

    next()
}

// error middleware to catch errors from other middleware functions
server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, try again later",
	})
})


server.listen(port, () => {
    console.log("Server running on port 4000")
})

