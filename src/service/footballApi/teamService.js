import { FOOTBALL_API_CALLS } from '../../constants'
import fetch from '..'
import { localTeams, teamStatitics } from '../../dummyDatas/teams'

const footballApiteamService = {}

const Route = `${FOOTBALL_API_CALLS}/teams`

footballApiteamService.getTeams = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/getAll`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return localTeams
}

footballApiteamService.getTeamStatitics = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/statistics`,
    params: query,
    method: 'get',
  })
  return data?.response
  // return teamStatitics
}

export default footballApiteamService
