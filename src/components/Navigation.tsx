import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Paging, StoreState } from '../types';
import './Navigation.css';

interface Props {
    paging: Paging;
    dispatch: (nav: actions.Navigate) => {};
}

function Navigation(props: Props) {
    return (
        <div>
            <h2 className="navigation-status">
                {navStatus(props)}
            </h2>
            <div className="button-holder">
                {NavButton('First', first, props)}
                {NavButton('Prev', prev, props)}
                {NavButton('Last', last, props)}
                {NavButton('Next', next, props)}
            </div>
        </div>
    );
}

function mapStateToProps({ paging }: StoreState) {
    return { paging };
}

export default connect(mapStateToProps)(Navigation);

function navStatus({ paging }: Props): string {
    if (paging && paging.requestedPage) {
        return `Fetching page ${ paging.requestedPage }...`;
    } else {
        return `Page ${ paging.page } of ${ paging.totalPages }`;
    }
}

type Page = number | void;
type NavFunc = (p: Paging) => Page;

function first({ page, perPage }: Paging): Page {
    if (page && 1 < page) {
        return 1;
    }
}

function prev({ page, perPage }: Paging): Page {
    if (page && 1 < page) {
        return page - 1;
    }
}

function next({ page, perPage, totalPages }: Paging): Page {
    if (page && totalPages && page < totalPages) {
        return page + 1;
    }
}

function last({ page, perPage, totalPages }: Paging): Page {
    if (page && totalPages && page < totalPages) {
        return totalPages;
    }
}

function NavButton(name: string, fn: NavFunc, { paging, dispatch }: Props) {
    if (paging === undefined) {
        return '';
    }
    const page = fn(paging);
    const perPage = paging.perPage;
    if (page) {
        const prevRequest = actions.fetchRequest({ page, perPage });
        const prevAction = actions.navigate(prevRequest);
        const onClick = () => { dispatch(prevAction); };
        return (
            <button className={name.toLowerCase() + '-button'} onClick={onClick}>
                {name}
            </button>
        );
    } else {
        return '';
    }
}
