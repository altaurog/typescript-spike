import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as c from './constants';
import * as actions from './actions';
import { FetchRequest, Paging, StoreState } from './types';
import fetchPage from './jsonplaceholder';

function initialRequest({ perPage, requestedPage }: Paging): FetchRequest {
    return actions.fetchRequest({ page: requestedPage, perPage });
}

export function* dataLoader() {
    yield takeEvery(c.FETCH_PAGE, fetchIt);
    let paging = yield select(getPaging);
    if (paging && paging.requestedPage) {
        yield put({type: c.FETCH_PAGE, payload: initialRequest(paging)});
    }
}

function* fetchIt(action: actions.Navigate) {
    let data = yield call(fetchPage, action.payload);
    yield put({type: c.USER_DATA, payload: data});
}

function getPaging(state: StoreState): Paging {
    if (state.paging) {
        return state.paging;
    }
    return { perPage: 20 };
}
