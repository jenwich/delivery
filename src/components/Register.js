
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

    handleSubmit(e) {
        e.preventDefault();
        this.dispatch(actions.submit());
    }

    render() {
        return (
            <form className="form-horizontal"  onSubmit={ this.handleSubmit.bind(this) }>
                <div className="form-group">
                    <label for="inputUsername" className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input id="inputUsername" onChange={ this.handleUsername.bind(this) } ref="username" type="text" placeholder="Username" aria-describedby="helpUsername" className="form-control"/>
                        <span id="helpUsername" className="help-block">{ this.state.username.message }</span>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputPassword" className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <input id="inputPassword" onChange={ this.handlePassword.bind(this) } ref="password" type="password" aria-describedby="helpPassword" className="form-control"/>
                        <span id="helpPassword" className="help-block">{ this.state.password.message }</span>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputConfirmPassword" className="col-sm-3 control-label">Confirm Password</label>
                    <div className="col-sm-9">
                        <input id="inputConfirmPassword" onChange={ this.handlePassword.bind(this) } ref="confirmPassword" type="password" aria-describedby="helpConfirmPassword" className="form-control"/>
                        <span id="helpConfirmPassword" className="help-block">{ this.state.confirmPassword.message }</span>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputEmail" className="col-sm-3 control-label">Email</label>
                    <div className="col-sm-9">
                        <input id="inputEmail" onChange={ this.handleEmail.bind(this) } ref="email" type="email" placeholder="Email" aria-describedby="helpEmail" className="form-control"/>
                        <span id="helpEmail" className="help-block">{ this.state.email.message }</span>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputFirstName" className="col-sm-3 control-label">Firstname</label>
                    <div className="col-sm-9">
                        <input id="inputFirstName" onChange={this.handleName.bind(this)} ref="firstName" type="text" placeholder="Firstname" aria-describedby="helpFirstname" className="form-control"/><span id="helpFirstname" className="help-block"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputLastName" className="col-sm-3 control-label">Lastname</label>
                    <div className="col-sm-9">
                        <input id="inputLastName" onChange={this.handleName.bind(this)} ref="lastName" type="text" placeholder="Lastname" aria-describedby="helpLastname" className="form-control"/><span id="helpLastname" className="help-block"></span>
                    </div>
                </div>
                <RegisterAddressList list={this.state.address} dispatch={ this.dispatch } />
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                        <button type="submit" className="btn btn-success">Sign Up</button><span className="help-block">{ this.state.message }</span>
                    </div>
                </div>
            </form>
        );
    }
}
