import { Message } from './actions';
import { StoreState } from './types';
import { FETCH_PAGE, USER_DATA } from './constants';

export function userData(state: StoreState, action: Message): StoreState {
  switch (action.type) {
    case FETCH_PAGE:
        let { page, perPage } = action.payload;
        return {
            paging: { perPage, requestedPage: page },
            ...state
        };
    case USER_DATA:
        return action.payload;
    default:
      return state;
  }
}
