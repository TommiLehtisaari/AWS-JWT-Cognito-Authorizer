import { success } from '../libs/response-lib';

// Public API
export async function main(event) {
  return success({
    message: 'Welcome to our Public API!',
    UserPoolId: process.env.USER_POOL_ID,
    UserPoolClientId: process.env.USER_POOL_CLIENT_ID,
    UserPoolRegion: process.env.USER_POOL_REGION
  });
}
