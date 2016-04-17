
import React from 'react';
import * as actions from '../actions/signinActions.js';

export default class Signin extends React.Component {
    componentWillMount() {
        this.setState(this.props.store.getState());
        this.dispatch = this.props.store.dispatch;
        this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
    }

    submit(e) {
        e.preventDefault();
        this.dispatch(actions.signin(this.refs.username.value.trim(), this.refs.password.value));
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={ this.submit.bind(this) }>
                <div className="form-group">
                    <label className="col-sm-2 control-label" for="inputUsername">Username</label>
                    <div className="col-sm-10">
                        <input id="inputUsername" ref="username" className="form-control" type="text" placeholder="Username" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label" for="inputPassword">Password</label>
                    <div className="col-sm-10">
                        <input id="inputPassword" ref="password" className="form-control" type="password" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                        <button className="btn btn-default" type="submit">Sign In</button>
                        <span className="help-block">{ this.state.message }</span>
                    </div>
                </div>
            </form>
        );
    }
}
