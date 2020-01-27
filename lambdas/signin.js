import { success } from '../libs/response-lib';
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: process.env.USER_POOL_REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_CLIENT_ID
  }
});

export async function main(event) {
  const { username, password } = JSON.parse(event.body);
  const result = await Amplify.Auth.signIn({ username, password });
  return success(result);
}
