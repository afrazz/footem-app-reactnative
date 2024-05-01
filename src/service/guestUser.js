import fetch from './index'

const guestUserService = {}

const Route = '/guestUser'

guestUserService.createGuestUser = async function (sendingData) {
  const { data } = await fetch({
    url: `${Route}/create`,
    method: 'post',
    data: sendingData,
  })

  return data
}

guestUserService.updateGuestUser = async function (sendingData) {
  const { data } = await fetch({
    url: `${Route}/updateLanguage`,
    method: 'put',
    data: sendingData,
  })

  return data
}

guestUserService.getProfile = async function (_id) {
  const { data } = await fetch({
    url: `${Route}/getProfile?_id=${_id}`,
    method: 'get',
  })

  return data
}

export default guestUserService
