
import React from 'react';
import * as actions from '../actions/registerActions.js';
import RegisterAddressList from './RegisterAddressList';

export default class Register extends React.Component {
    componentWillMount() {
        this.setState(this.props.store.getState());
        this.dispatch = this.props.store.dispatch;
        this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
    }

    handleUsername() {
        this.dispatch(actions.validateUsername(this.refs.username.value.trim()));
    }

    handlePassword() {
        this.dispatch(actions.validatePassword(
            this.refs.password.value, this.refs.confirmPassword.value));
    }

    handleEmail() {
        this.dispatch(actions.validateEmail(this.refs.email.value.trim()));
    }

    handleName() {
        this.dispatch(actions.validateName(
            this.refs.firstName.value.trim(), this.refs.lastName.value.trim()));
    }

    handleSubmit() {
        this.dispatch(actions.submit());
    }

    render() {
        return (
            <div>
                Username: <input type="text" ref="username" onChange={ this.handleUsername.bind(this) }/> <span>{ this.state.username.message }</span><br />
                Password: <input type="password" ref="password" onChange={ this.handlePassword.bind(this) }/> <span>{ this.state.password.message }</span><br />
                Confire-Password: <input type="password" ref="confirmPassword" onChange={ this.handlePassword.bind(this) }/> <span>{ this.state.confirmPassword.message }</span><br />
                E-mail: <input type="text" ref="email" onChange={ this.handleEmail.bind(this) }/> <span>{ this.state.email.message }</span><br />
                FirstName: <input type="text" ref="firstName" onChange={ this.handleName.bind(this) }/><br />
                LastName: <input type="text" ref="lastName" onChange={ this.handleName.bind(this) }/><br />
                <RegisterAddressList list={ this.state.addresses } dispatch={ this.dispatch } />
                <button onClick={ this.handleSubmit.bind(this) }>Submit</button>
                { this.state.message }
            </div>
        );
    }
}
