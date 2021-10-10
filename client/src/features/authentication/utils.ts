import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { TOKEN_STORAGE_KEY } from 'config'

export const saveToken = (token: string) => {
  const decodedToken: DecodedToken = jwtDecode(token)

  Cookies.set(TOKEN_STORAGE_KEY, token, {
    expires: new Date(+decodedToken.exp * 1000),
    secure: true,
  })
}

export const getToken = (): string | null => {
  return Cookies.get(TOKEN_STORAGE_KEY) || null
}

export const unsetTokens = () => {
  Cookies.remove(TOKEN_STORAGE_KEY)
}

export const getTokenData = (): DecodedToken | null => {
  const token = getToken()
  return token ? jwtDecode(token) : null
}

type DecodedToken = {
  userID: string
  exp: string
  iat: string
}
