require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const playlist = "PLRfY4Rc-GWzhdCvSPR7aTV0PJjjiSAGMs"

const {google} = require('googleapis')
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.API_KEY
})

const playlistUrlToId = url => {
  let arr = url.split("list=")
  let id = arr.length > 1 ?
  arr[1].split("&")[0] : arr[0].split("&")[0]

  return id
}

const getVideos = async playlistId => {
  const res = await youtube.playlistItems.list({
    "part": [
      "snippet"
    ],
    "playlistId": playlistId,
    maxResults:"50"
  })
  return res.data.items
}

const getIdsFromVideosArray = videosArray => {
  let videoIds = []
  videosArray.forEach(video => {
    videoIds.push(video.snippet.resourceId.videoId)
  })
  return videoIds
}

const getVideoDetails = async videoIds => {
  const res = await youtube.videos.list({
    "part": [
      "snippet,contentDetails"
    ],
    "id": videoIds
  })
  return res.data.items
}

const isoToSeconds = isodur => {
  
}


const cleanVideoDetails = videoDetailsArray => {
  let cleanVidsArray = []
  videoDetailsArray.forEach(video => {
    cleanVidsArray.push(
      {
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        thumbnailUrl: video.snippet.thumbnails.medium.url,
        duration: video.contentDetails.duration
      }
    )
  })
  return cleanVidsArray
}

const playlistUrlToVideoDetailsArray = async playlistUrl => {
  let playlistId = playlistUrlToId(playlistUrl)
  let videosArray = await getVideos(playlistId)
  let videoIds = getIdsFromVideosArray(videosArray)
  let videoDetailsArray = await getVideoDetails(videoIds)
  let cleanDetails = cleanVideoDetails(videoDetailsArray)

  return cleanDetails
}

playlistUrlToVideoDetailsArray(playlist).then(console.log)

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