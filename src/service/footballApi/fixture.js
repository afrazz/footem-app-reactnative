import { FOOTBALL_API_CALLS } from '../../constants'
import fetch from '..'
import countries from '../../dummyDatas/countries'

const footballApiFixturesService = {}

const Route = `${FOOTBALL_API_CALLS}/fixtures`

footballApiFixturesService.getFixtures = async function (query) {
  //   TODO: Dummy Data Reveled here
  // try {
  const { data } = await fetch({
    url: `${Route}`,
    params: query,
    method: 'get',
  })
  return data?.response
  // } catch (err) {
  //   alert(JSON.stringify(err))
  //   throw err; // Throw the error to propagate it
  // }

  //   return countries
}

footballApiFixturesService.getH2hFixtures = async function (query) {
  //   TODO: Dummy Data Reveled here

  const { data } = await fetch({
    url: `${Route}/headtohead`,
    params: query,
    method: 'get',
  })
  return data?.response

  //   return countries
}

footballApiFixturesService.getFixtureRounds = async function (query) {
  //   TODO: Dummy Data Reveled here

  const { data } = await fetch({
    url: `${Route}/rounds`,
    params: query,
    method: 'get',
  })
  return data?.response

  //   return countries
}

export default footballApiFixturesService
