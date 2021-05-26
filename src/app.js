const express = require('express')

const userRouter = require('../routers/main')
const app = express()

app.use(express.urlencoded({extended : false}))
app.use(userRouter)



app.listen(3001, () => {
    console.log('Server is up on port 3001')
})

