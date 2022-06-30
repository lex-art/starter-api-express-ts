

import userModel from '../model/user'
import constants from '../utils/constants'
import { compare } from '../../helper/handleBcrypt'
import jwt from 'jsonwebtoken'
import { UserToken, CheckUser } from '../../interfaces/user'

async function checkUser(
  email: string,
  password?: string,
  isRefreshToken?: boolean
): Promise<CheckUser> {
  let error: boolean | Error | undefined,
    message: string | undefined,
    user: UserToken | undefined,
    accessToken: string | undefined
  await userModel
    .getUser(email)
    .then(async (result) => {
      const userResult = {
        userName: result?.user_name,
        fisrtName: result?.first_name,
        lastName: result?.last_name,
        email: result?.email,
        role: ['admin']
      }
      if (result) {
        if (password) {
          const checkPass = await compare(password, result?.password ?? '')
          if (checkPass) {
            user = userResult
            accessToken = jwt.sign(
              userResult,
              process.env?.SECRET_KEY_JWT || '',
              {
                expiresIn: '30m',
              }
            )
          } else {
            error = true
            message = constants.ERROR_MSG.PASSVORD_INVALID
          }
        } else if (isRefreshToken) {
          user = userResult
          accessToken = jwt.sign(user, process.env?.SECRET_KEY_JWT || '', {
            expiresIn: '30m',
          })
        } else {
          error = true
          message = constants.ERROR_MSG.PASSWORD_MISSING
        }
      } else {
        error = true
        message = constants.ERROR_MSG.USER_NOT_FOUND
      }
    })
    .catch((err: Error) => {
      error = err
      message = constants.ERROR_MSG.NOT_RESULT_FOUND
    })
  return {
    error,
    message,
    user,
    accessToken,
  }
}

export { checkUser }
