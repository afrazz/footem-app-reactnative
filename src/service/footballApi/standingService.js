import { FOOTBALL_API_CALLS } from '../../constants'
import fetch from '..'
import { multiGroupTable } from '../../dummyDatas/pointTable'
// import squad from '../../dummyDatas/squad'

const footballApiStandingService = {}

const Route = `${FOOTBALL_API_CALLS}/standings`

footballApiStandingService.getStandings = async function (query) {
  // TODO: Dummy Data Reveled here
  const { data } = await fetch({
    url: `${Route}`,
    params: query,
    method: 'get',
  })
  return data?.response[0]?.league

  // return multiGroupTable
}

export default footballApiStandingService
