import {
  CHECH_AUTH
} from '../actions/user/USER_TYPES';

export default function (state = {}, action) {
  switch (action.type) {
    case CHECH_AUTH:
      return {...state, auth: action.payload};
    default:
      return state;
  }
}
