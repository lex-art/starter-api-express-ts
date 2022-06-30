import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import { CheckUser } from '../../../interfaces/user'
import { checkUser } from '../../helper/checkUserDB'
import { refreshJwt } from '../../helper/jwt'
import userModel from '../../model/user'
import constants from '../../utils/constants'
import { sendEmailReset } from '../../helper/emailSender';
import { compare, encrypt } from './../../../helper/handleBcrypt';
import { UserToken } from './../../../interfaces/user';


function register(_: Request, res: Response): Response {
  return res.status(200).json({
    message: 'Success',
  })
}
async function login(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body
  if (!(email && password)) return res.status(401).json({
    error: true,
    message: constants.ERROR_MSG.MISSING_FIELD
  })

  const { error, message, user, accessToken } = await checkUser(email, password)

  if (error) return res.status(401).json({
    error,
    message
  })

  return res.status(200).header(
    'autorization',
    `Bearer ${accessToken}`
  ).json({
    succes: true,
    accessToken,
    user
  })
}

async function refreshToken(req: Request, res: Response): Promise<Response> {
  const token = req.headers.authorization
  const { error, message, user, accessToken } = await refreshJwt(token) as CheckUser

  if (error) return res.status(401).json({
    error,
    message
  })

  return res.status(200).header(
    'autorization',
    `Bearer ${accessToken}`
  ).json({
    succes: true,
    accessToken,
    user
  })
}

async function forgotPassword(req: Request, res: Response): Promise<Response | void> {
  const { userEmail } = req.body;
  if (!userEmail) return res.status(400).json({
    error: true,
    message: constants.ERROR_MSG.EMAIL_MISSING
  })

  userModel.getUser(userEmail).then(async (response) => {
    const email = response?.email;
    const tokenReset = jwt.sign({ email }, process.env.SECRET_KEY_JWT_RESET || '', {
      expiresIn: '1h'
    })
    const existTokenEmail = await userModel.getExistTokenEmail(userEmail).then()
    if (existTokenEmail)
      userModel.saveTokenReset(userEmail, tokenReset, true).then(async () => {
        const { error, id, message, url } = await sendEmailReset(email ?? '', tokenReset)
        if (error) return res.status(400).json({
          error,
          message,
          url
        })
        else if (id) return res.status(200).json({
          id,
          url
        })
        else return res.status(400).json({
          error: true,
          message: constants.ERROR_MSG.COMMIN_MSG_ERROR
        })
      }).catch(err => res.status(400).json({ message: constants.ERROR_MSG.FAIL_UPDATE_RESET_TOKEN, err }))
    else
      userModel.saveTokenReset(userEmail, tokenReset).then(async () => {
        const { error, id, message, url } = await sendEmailReset(email ?? '', tokenReset)
        if (error) return res.status(400).json({
          error,
          message,
          url
        })
        else if (id) return res.status(200).json({
          id,
          url
        })
        else return res.status(400).json({
          error: true,
          message: constants.ERROR_MSG.COMMIN_MSG_ERROR
        })
      }).catch(err => res.json({ message: constants.ERROR_MSG.FAIL_CREATE_RESET_TOKEN, error: err })
      )
  }).catch((err: Error) => res.status(400).json({
    error: err,
    message: constants.ERROR_MSG.NOT_RESULT_FOUND
  })
  )

}

function createNewPassword(req: Request, res: Response): Response | void {
  const { newPassword } = req.body
  const tokenReset = req.headers["token-reset"]
  if (!(newPassword && tokenReset)) return res.status(401).json({
    error: true,
    message: constants.ERROR_MSG.TOKEN_EMAIL_REQUIRED
  })
  const token = tokenReset as string
  jwt.verify(token, process.env.SECRET_KEY_JWT_RESET ?? '', async (err, user) => {
    if (err) return res.status(401).json({
      error: err,
      message: constants.ERROR_MSG.TOKEN_EXPIRED
    })
    const { email } = user as UserToken
    const existToken = await userModel.getExistTokenEmail(email ?? '')
    if (existToken)
      return userModel.changePassword(email ?? '', await encrypt(newPassword))
        .then(async () => {
          await userModel.deleteTokenEmail(email ?? '').then()
          return res.status(200).json({
            success: true,
            message: constants.COMMON.SUCCESS
          })
        })
        .catch((err: Error) => res.status(400).json({
          error: err,
          message: constants.ERROR_MSG.ERROR_CHANGE_PSSW
        }))
    else return res.status(401).json({
      error: true,
      message: constants.ERROR_MSG.TOKEN_EMAIL_REQUIRED
    })
  })
}

function changePassword(req: Request, res: Response): Response | void {
  const { newPassword, email, oldPswd } = req.body;
  if (!newPassword && !email)
    return res.status(401).json({
      message: constants.ERROR_MSG.MISSING_FIELD
    });
    
  userModel.getUser(email ?? '').then(async (response) => {
    if (oldPswd && newPassword && email) {
      const checkPass = await compare(oldPswd, response?.password ?? '');
      if (checkPass === true) {
        userModel.changePasswordUser(email, newPassword)
          .then(() => {
            res.status(200).json({
              success: true,
              message: constants.COMMON.SUCCESS
            });
          })
          .catch((error) =>
            res
              .status(400)
              .json({ error, message: constants.ERROR_MSG.ERROR_CHANGE_PSSW })
          );
      } else res.status(400).json({ message: constants.ERROR_MSG.ACTUAL_PSSW_INVALID });
    } else res.status(400).json({ message: constants.ERROR_MSG.MISSING_ACTUAL_PSSW });
   }).catch((err: Error) => res.status(400).json({
      error: err,
      message: constants.ERROR_MSG.NOT_RESULT_FOUND
    }))
}
export default {
  register,
  login,
  refreshToken,
  forgotPassword,
  createNewPassword,
  changePassword
}
