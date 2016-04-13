import React from 'react';
import * as actions from '../actions/signinActions.js';

export default class Signin extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.setState(this.props.store.getState());
        this.dispatch = this.props.store.dispatch;
        this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
    }

    submit() {
        this.dispatch(actions.signin(this.refs.username.value.trim(), this.refs.password.value));
    }

    render() {
        return (
            <div>
                Username: <input type="text" ref="username" /><br />
                Password: <input type="password" ref="password" /><br />
                <button onClick={ this.submit.bind(this) }>Sign In</button>
                <span>{ this.state.signin.message }</span>
            </div>
        );
    }
}
