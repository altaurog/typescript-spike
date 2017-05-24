import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../types';

interface Props {
  error?: string;
}

function ErrorBar({ error = '' }: Props) {
  return <div className="error-message"> {error} </div>;
}

function mapStateToProps({ error }: StoreState) {
    return { error };
}

export default connect(mapStateToProps)(ErrorBar);
