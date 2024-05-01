import { FOOTBALL_API_CALLS } from '../../constants'
import fetch from '..'
import squad from '../../dummyDatas/squad'

const footballApiPlayerService = {}

const Route = `${FOOTBALL_API_CALLS}/players`

footballApiPlayerService.getSquad = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/squads`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return squad
}

footballApiPlayerService.getPlayers = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/getAll`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return squad
}

footballApiPlayerService.getPlayerSeason = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/seasons`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return squad
}

footballApiPlayerService.getTopScorers = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/topscorers`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return squad
}
footballApiPlayerService.getTopAssists = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/topassists`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return squad
}
footballApiPlayerService.getTopYellowCards = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/topyellowcards`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return squad
}
footballApiPlayerService.getTopRedCards = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}/topredcards`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return squad
}

export default footballApiPlayerService
