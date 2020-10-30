import pkg from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()
const {google} = pkg

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
  let arr = isodur.split(/(H|M|S|P|T)/)
  let seconds = arr.includes('S') ? parseInt(arr[arr.indexOf('S')-1]) : 0
  let minutes = arr.includes('M') ? parseInt(arr[arr.indexOf('M')-1]) : 0
  let hours = arr.includes('H') ? parseInt(arr[arr.indexOf('H')-1]) : 0
  let days = arr.includes('D') ? parseInt(arr[arr.indexOf('D')-1]) : 0

  let totalSeconds = seconds + (minutes * 60) + (hours * 3600) + (days * 86400)

  return totalSeconds
}

const cleanVideoDetails = videoDetailsArray => {
  let cleanVidsArray = []
  videoDetailsArray.forEach(video => {
    cleanVidsArray.push(
      {
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        thumbnailUrl: video.snippet.thumbnails.medium.url,
        duration: isoToSeconds(video.contentDetails.duration)
      }
    )
  })
  return cleanVidsArray
}

export const playlistUrlToVideoDetailsArray = async playlistUrl => {
  let playlistId = playlistUrlToId(playlistUrl)
  let videosArray = await getVideos(playlistId)
  let videoIds = getIdsFromVideosArray(videosArray)
  let videoDetailsArray = await getVideoDetails(videoIds)
  let cleanDetails = cleanVideoDetails(videoDetailsArray)

  return cleanDetails
}
