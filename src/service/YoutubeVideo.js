import fetch from './index'

const youtubeVideoService = {}

const Route = '/youtubeVideo'

youtubeVideoService.getYoutubeVideos = async function (query) {
  const { data } = await fetch({
    url: `${Route}/getAll/public`,
    params: query,
    method: 'get',
  })
  return data?.results
}

export default youtubeVideoService
