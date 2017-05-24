import * as React from 'react';
import { connect } from 'react-redux';
import { User, StoreState } from '../types';
import './DataGrid.css';

interface Props {
    data?: User[];
}

function DataGrid({ data = [] }: Props) {
    return (
        <table className="data-grid">
            <thead>
                <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>name</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
                {data.map(DataRow)}
            </tbody>
        </table>
    );
}

function DataRow(user: User) {
    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
        </tr>
    );
}

function mapStateToProps({ data }: StoreState): Props {
    return { data };
}

export default connect(mapStateToProps)(DataGrid);
