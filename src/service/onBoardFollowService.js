import fetch from './index'

const onBoardFollowService = {}

onBoardFollowService.getSuggestedTeam = async function (query) {
  const { data } = await fetch({
    url: `/suggestedTeam/getAll/public`,
    params: query,
    method: 'get',
  })
  return data?.results
}

onBoardFollowService.getLeagues = async function (query) {
  const { data } = await fetch({
    url: `/league/getAll/public`,
    params: query,
    method: 'get',
  })
  return data?.results
}

export default onBoardFollowService
