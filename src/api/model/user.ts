import knex from '../../knex'

function getUser(email:string) {
  return knex('users').where({ email }).first()
}

function getExistTokenEmail(userEmail: string) {
  return knex('token_emails').where({ user_email: userEmail}).first();
}

function saveTokenReset(userEmail: string, token: string, updateToken?: boolean) {
    if(updateToken)
    return knex('token_emails').where({ user_email: userEmail }).update({
      token
    });
    else
    return knex('token_emails').insert({
      user_email: userEmail,
      token
    });
}

function changePassword(email:string, newPassword: string) {
  return knex('users').where({ email })
  .update({
    password: newPassword,
    updated_at: knex.fn.now()
  })
}
  
function deleteTokenEmail(userEmail:string) {
  return  knex('token_emails').where({ user_email: userEmail }).del();
}
function changePasswordUser(email: string, newPassword: string) {
  return knex('users').where({ email })
  .update({
    password: newPassword,
    updated_at: knex.fn.now()
  })  
}
export default {
  getUser,
  getExistTokenEmail,
  saveTokenReset,
  changePassword,
  deleteTokenEmail,
  changePasswordUser
}