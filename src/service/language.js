import fetch from './index'

const languageService = {}

const Route = '/language'

languageService.getLanguages = async function (query) {
  const { data } = await fetch({
    url: `${Route}/getAll/public`,
    params: query,
    method: 'get',
  })
  return data?.results
}

export default languageService
