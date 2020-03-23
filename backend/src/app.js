const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const userDataRouter = require('./routers/userData')
const boardRouter = require('./routers/board')
const listRouter = require('./routers/list')
const cardRouter = require('./routers/card')

const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(userDataRouter)
app.use(boardRouter)
app.use(listRouter)
app.use(cardRouter)


module.exports = app