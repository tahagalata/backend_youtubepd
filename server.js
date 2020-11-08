import {playlistUrlToVideoDetailsArray as youtube} from './youtubeFunctions.js'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json());


app.post('/', (req, res) => {
  // youtube(req.body.url).then(videoList => res.json(videoList))
  console.log(req.body)
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})