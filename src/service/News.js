import fetch from './index'

const newsService = {}

const Route = '/news'

newsService.getNews = async function (query) {
  const { data } = await fetch({
    url: `${Route}/getAll/public`,
    params: query,
    method: 'get',
  })
  // TODO: Needs to fix this
  // if (Array.isArray(data)) {
  //   if (data[0]?.results) {
  //     return data[0]?.results
  //   } else {
  //     return data
  //   }
  // } else {
  console.log(data, 'weerere')
  return data.results
  // return data[0]?.results

  // }
}

newsService.getNewsById = async function (id, languageId) {
  const { data } = await fetch({
    url: `${Route}/${id}/public?related=${true}`,
    method: 'get',
    params: languageId ? { related: true, languageId } : { related: true },
  })

  return data
}

export default newsService
