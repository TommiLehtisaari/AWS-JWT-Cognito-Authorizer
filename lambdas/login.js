import { success, forbidden, badrequest } from '../libs/response-lib';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: process.env.USER_POOL_REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_CLIENT_ID
  }
});

export async function main(event) {
  const { username, password, newPassword } = JSON.parse(event.body);
  let user;
  try {
    user = await Auth.signIn({ username, password });
  } catch (exeption) {
    return forbidden(exeption);
  }
  // New user's are required to change their temporary password before they can get JWT.
  if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    if (!newPassword) {
      return forbidden({
        message: `
          New password required when login for the first time.
          Password must be at lest 8 characters long and contain numbers, upper and lower case letters`,
        fields: { username: 'required', password: 'required', newPassword: 'required' }
      });
    }
    try {
      user = await Auth.completeNewPassword(user, newPassword);
    } catch (exeption) {
      return badrequest(exeption);
    }
  }

  return success({ token: user.signInUserSession.idToken.jwtToken });
}
