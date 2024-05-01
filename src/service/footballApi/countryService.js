import { FOOTBALL_API_CALLS } from '../../constants'
import fetch from '..'
import countries from '../../dummyDatas/countries'

const footballApiCountryService = {}

const Route = `${FOOTBALL_API_CALLS}/countries`

footballApiCountryService.getCountries = async function (query) {
  //   TODO: Dummy Data Reveled here

  const { data } = await fetch({
    url: `${Route}/getAll`,
    params: query,
    method: 'get',
  })
  return data?.response

  // return countries
}

export default footballApiCountryService
