import fetch from './index'

const authService = {}

const Route = '/auth'

authService.registerOrLoginUser = async function () {
  const { data } = await fetch({
    url: `${Route}/register-or-login-user`,
    method: 'post',
  })

  return data
}

authService.getCurrentUser = async function () {
  const { data } = await fetch({
    url: `${Route}/current-user`,
    method: 'post',
  })

  return data
}

export default authService
