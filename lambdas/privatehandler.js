import { success } from '../libs/response-lib';

// Private API
export async function main(event) {
  const { claims } = event.requestContext.authorizer;
  return success({ claims, message: 'Only authenticated users can see this!' });
}
