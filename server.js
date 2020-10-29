import {playlistUrlToVideoDetailsArray as youtube} from './youtubeFunctions.js'
import express from 'express'

const app = express()
const port = 3000


app.use(express.json());

app.post('/', (req, res) => {
  youtube(req.body.url).then(videoList => res.json(videoList))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})