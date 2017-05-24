export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
}


export interface FetchRequest {
    resource: string;
    page: number;
    perPage: number;
}

export interface Paging {
    perPage: number;
    page?: number;
    totalPages?: number;
    requestedPage?: number;
}

export interface StoreState {
    data?: User[];
    paging?: Paging;
    error?: string;
}
