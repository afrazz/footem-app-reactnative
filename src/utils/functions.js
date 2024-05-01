/* eslint-disable no-prototype-builtins */
import moment from 'moment'
import countryCodes from '../data/countryCodes'
import { getCalendars } from 'expo-localization'
// import { getName } from 'country-list'
import * as Network from 'expo-network'
import axios from 'axios'
import footballApiCountryService from '../service/footballApi/countryService'

const calculateRelativeTime = (date) => {
  const currentDate = moment()
  const providedDate = moment(date)

  const diffInDays = currentDate.diff(providedDate, 'days')
  const diffInMonths = currentDate.diff(providedDate, 'months')

  if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return 'Yesterday'
  } else if (diffInDays === 2) {
    return '2 days ago'
  } else if (diffInDays >= 3 && diffInDays <= 30) {
    return `${diffInDays} days ago`
  } else if (diffInMonths === 1) {
    return '1 month ago'
  } else if (diffInMonths > 1) {
    return `${diffInMonths} months ago`
  } else {
    return 'Different logic based on your requirements'
  }
}

const getCountryCode = (countryName) => {
  if (countryName) {
    const formattedCountryName = countryName.trim()

    if (countryCodes.hasOwnProperty(formattedCountryName)) {
      return countryCodes[formattedCountryName]
    }
  }

  // Handle cases where the country name is not found in the mapping
  return null
}

const getMatchStatus = (status, elapsed) => {
  switch (status) {
    case '1H':
      return elapsed
    case '2H':
      return elapsed
    case 'ET':
      return elapsed
    default:
      return status
  }
}

const removeNullValues = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.filter((item) => item !== null)
  }

  const filteredObj = {}
  for (const key in obj) {
    const value = removeNullValues(obj[key])
    if (value !== null) {
      filteredObj[key] = value
    }
  }

  return Object.keys(filteredObj).length ? filteredObj : null
}

const parseQueryParams = (url) => {
  const queryParams = {}
  const queryString = url.split('?')[1]

  if (queryString) {
    const keyValuePairs = queryString.split('&')

    for (const pair of keyValuePairs) {
      const [key, value] = pair.split('=')
      queryParams[key] = value
    }
  }

  return queryParams
}

const getUserDeviceBasedInfo = async () => {
  const { timeZone } = await getCalendars()[0]
  let countryName = null
  // const { regionCode } = await getLocales()[0]
  // const countryName = getName(regionCode)

  // Get IP Adress
  // Make API Call to http://ip-api.com/json/103.175.89.106
  // WE Get Country Code => Make a API Call to football API to get CountryName
  // And Return

  try {
    const ipAdress = await Network.getIpAddressAsync()
    if (ipAdress && ipAdress !== '0.0.0.0') {
      const userLocationInfo = await axios.get(
        'http://ip-api.com/json/103.175.89.106'
      )
      if (userLocationInfo?.data?.countryCode) {
        const country = await footballApiCountryService.getCountries({
          code: userLocationInfo.data.countryCode,
        })
        if (country[0]?.name) {
          countryName = country[0].name
        } else {
          countryName = null
        }
      }
    }
  } catch (err) {
    console.log(err.message)
    countryName = null
  }

  return { timeZone, countryName }
}

export {
  calculateRelativeTime,
  getCountryCode,
  getMatchStatus,
  removeNullValues,
  parseQueryParams,
  getUserDeviceBasedInfo,
}
