import { UserToken } from './../../interfaces/user'
import { verify } from 'jsonwebtoken'
import { CheckUser } from '../../interfaces/user'
import { checkUser } from './checkUserDB'
import constants from '../utils/constants'

function tokenVerifyRefresh(iatToken: number) {
  const now = new Date()
  const expiresOn = (iatToken + constants.COMMON.FOR_REFRESH_TOKEN * 60) * 1000
  return (expiresOn < now.getTime())
}

function refreshJwt(token: string | undefined): Promise<CheckUser> | void {
  let clearedToken = ''
  if (String(token).startsWith('Bearer ')) clearedToken = token?.split(' ')[1] ?? ''
  else clearedToken = token ?? ''
  return verify(clearedToken, process.env?.SECRET_KEY_JWT || '', async (err, user) => {
    if (err) return {
      error: err,
      message: constants.ERROR_MSG.TOKEN_EXPIRED
    }
    else {
      const { email, iat } = user as UserToken
      if (tokenVerifyRefresh(iat ?? 0))
        return await checkUser(email ?? '', undefined, true)
      else
        return { user, accessToken: clearedToken }
    }
  })
}
function validateJwt(token: string | undefined): CheckUser | void {
  let clearedToken = ''
  if (String(token).startsWith('Bearer ')) clearedToken = token?.split(' ')[1] ?? ''
  else clearedToken = token ?? ''
  return verify(clearedToken, process.env?.SECRET_KEY_JWT || '', (err, user) => {
    if (err) return {
      error: err,
      message: constants.ERROR_MSG.TOKEN_EXPIRED
    }
    else
      return { user }

  })
}

export {
  refreshJwt,
  validateJwt
}