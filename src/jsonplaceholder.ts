import 'whatwg-fetch';
import { FetchRequest, User, Paging, StoreState } from './types';
export default fetchPage;

const BASE_URL = 'http://jsonplaceholder.typicode.com';

function fetchPage({resource, page, perPage}: FetchRequest): Promise<StoreState> {
    const url = `${BASE_URL}/${resource}?_page=${page}&_limit=${perPage}`;
    const requestHeaders = {'Content-Type': 'application/json'};
    return fetch(url, {headers: requestHeaders})
    .then(res => {
        let response: any = res;
        if (!response.ok) {
            return {error: `Error retreiving data: ${response.statusText}`};
        }
        return response.json().then((data: Array<{}>) => ({
            data: data.map(parseUser),
            paging: parseLinkHeader(url, response.headers.get('Link')),
        }));
    });
}

function parseLinkHeader(url: string, linkHeader: string): Paging {
    return {
        page: safeNum(url, /_page=(\d+)/),
        perPage: safeNum(linkHeader, /_limit=(\d+)/),
        totalPages: safeNum(linkHeader, /.*_page=(\d+)/),
    };
}

function parseUser(obj: any): User {
    const user: User = obj;
    const { id, username, name, email } = user;
    return { id, username, name, email };
}

function safeNum(s: string, re: RegExp): number {
    let m = s.match(re);
    if (m) {
        return + m[1];
    }
    return 0;
}
