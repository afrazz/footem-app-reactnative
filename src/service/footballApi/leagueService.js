import { FOOTBALL_API_CALLS } from '../../constants'
import fetch from '..'

const footballApiLeagueService = {}

const Route = `${FOOTBALL_API_CALLS}/leagues`

footballApiLeagueService.getLeagues = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/getAll`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return localTeams
}

export default footballApiLeagueService
