import {playlistUrlToVideoDetailsArray as youtube} from './youtubeFunctions.js'
import express from 'express'


const app = express()
const port = 3000

const playlist = "PLRfY4Rc-GWzhdCvSPR7aTV0PJjjiSAGMs"


youtube(playlist).then(console.log)

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/', (req, res) => {
//   res.send(req.body)
// })

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`)
// })