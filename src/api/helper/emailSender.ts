import tranporterConfig from './nodeMailerSettings'
import templateResetEmail from '../utils/templates/resetEmail'
interface SendeEmailReset {
    id?: string
    url?: string
    error?: any
    message?: string
}
async function sendEmailReset(email: string, token: string): Promise <SendeEmailReset> {
    const trasporter = tranporterConfig();
    const urlReset = process.env.URL_FRONT_END + "/auth/reset-password/" + token;
    const templateHTML = templateResetEmail(urlReset)
    const info = await trasporter.sendMail({
        from: "Test email <registro@palabraenaccion.org>",
        to: email,
        subject: "Reestablecer su contraseña",
        html: templateHTML
    })

    if (info.messageId)
        return {
            id: info.messageId,
            url: urlReset
        }
    else
        return {
            error: info.rejected,
            message: "The email could not be sent",
            url: urlReset
        }
}

export {
    sendEmailReset
}