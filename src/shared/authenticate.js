export const authenticate = async (request, _response, next) => {
  const apiToken = request.headers.authorization;
  request.user = await request.db.users.findByApiKey(apiToken);
  next();
};
