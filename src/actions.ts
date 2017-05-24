import * as types from './types';
import * as constants from './constants';

export interface Navigate {
    type: constants.FETCH_PAGE;
    payload: types.FetchRequest;
}

export function fetchRequest({ page = 1, perPage }: types.Paging): types.FetchRequest {
    return {
        resource: 'users',
        page,
        perPage
    };
}

export function navigate(request: types.FetchRequest): Navigate {
    return {
        type: constants.FETCH_PAGE,
        payload: request,
    };
}

export interface UserData {
    type: constants.USER_DATA;
    payload: types.StoreState;
}

export type Message = UserData | Navigate;
