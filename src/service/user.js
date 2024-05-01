import fetch from './index'

const userService = {}

const Route = '/user'

userService.getFollowingTeams = async function () {
  const { data } = await fetch({
    url: `${Route}/profile/followingTeams`,
    method: 'get',
  })

  return data
}

userService.getFollowingLeagues = async function () {
  const { data } = await fetch({
    url: `${Route}/profile/followingLeagues`,
    method: 'get',
  })

  return data
}

userService.addTeamFollow = async function (sendingData) {
  console.log(sendingData, 'shoeee')
  const { data } = await fetch({
    url: `${Route}/profile/addTeamFollow`,
    method: 'post',
    data: sendingData,
  })

  return data
}

userService.setLeagueFollows = async function (sendingData) {
  const { data } = await fetch({
    url: `${Route}/profile/setLeagueFollows`,
    method: 'post',
    data: sendingData,
  })

  return data
}

userService.setTeamFollows = async function (sendingData) {
  const { data } = await fetch({
    url: `${Route}/profile/setTeamsFollows`,
    method: 'post',
    data: sendingData,
  })

  return data
}

userService.removeTeamFollow = async function (id) {
  const { data } = await fetch({
    url: `${Route}/profile/removeTeamFollow/${id}`,
    method: 'delete',
  })

  return data
}

userService.addLeagueFollow = async function (sendingData) {
  const { data } = await fetch({
    url: `${Route}/profile/addLeagueFollow`,
    method: 'post',
    data: sendingData,
  })

  return data
}

userService.removeLeagueFollow = async function (id) {
  const { data } = await fetch({
    url: `${Route}/profile/removeLeagueFollow/${id}`,
    method: 'delete',
  })

  return data
}

userService.updateUserInfo = async function (sendingData) {
  const { data } = await fetch({
    url: `${Route}/profile/updateInfo`,
    method: 'put',
    data: sendingData,
  })

  return data
}

export default userService
