import { success } from '../libs/response-lib';

// Public API
export async function main(event) {
  return success({
    message: 'Welcome to our Public API!'
  });
}
