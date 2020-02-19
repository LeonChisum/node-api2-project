
// implementing API
const express = require("express")

const db = require("./data/db")

// importing router(s)
const postRoutes = require("./posts/postsRoutes")

const server = express()

server.use(express.json())



server.use("/api", postRoutes)
server.use('/', (req, res) => res.send('API up and running!'));


server.listen(5000, () => {
    console.log("server started at http://localhost:5000")
})