import jwtDecode from 'jwt-decode';
import { User } from '../authorization/model';

export const loadDb = (request, _response, next) => {
  request.db = {
    users: {
      findByApiKey: async token => {
        try {
          const decoded = jwtDecode(token);
          const user = await User.findOne({ _id: decoded?.userId });
          return user;
        } catch (e) {
          return null;
        }
      },
    },
  };
  next();
};
