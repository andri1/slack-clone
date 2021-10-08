import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const TOKEN_STORAGE_KEY = '_tok'

export const saveToken = (token: string) => {
  Cookies.set(TOKEN_STORAGE_KEY, token, {
    expires: 30,
    secure: true,
  })
}

export const getToken = (): string | null => {
  return Cookies.get(TOKEN_STORAGE_KEY) || null
}

export const unsetTokens = () => {
  Cookies.remove(TOKEN_STORAGE_KEY)
}

export const getTokenData = (): any | null => {
  const token = getToken()
  return token ? jwtDecode(token) : null
}
