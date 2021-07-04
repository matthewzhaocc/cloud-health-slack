import express from 'express'
import morgan from 'morgan'
import webhook from '../api/webhook'
const app = express()
app.use(morgan('common'))

app.use('/', webhook())

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on ${process.env.PORT || 3000}`)
})