import express from 'express'
import { createConnection } from 'typeorm'
import routes from './routes'

const init = async () => {

  await createConnection();

}

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(routes)



app.listen(3333, () => console.log('app running on port 3333'))

init()