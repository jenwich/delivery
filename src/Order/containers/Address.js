
import React from 'react';
import { changeAddress } from '../redux/address';
import { purchase } from '../redux/cart';

export default class Address extends React.Component {
    componentWillMount() {
        this.setState(this.props.store.getState());
        this.setState({
            selected: 0
        })
        this.dispatch = this.props.store.dispatch;
        this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
    }

    componentWillUnmount() {
        this.unsub();
    }

    handleChange(e) {
        this.setState({
            selected: e.target.value
        })
        if (this.refs.selector.value != this.props.address.length) {
            var index = e.target.value
            this.dispatch(changeAddress(this.props.address[index].value));
        } else {
            this.dispatch(changeAddress(""));
        }
    }

    handleChangeText(e) {
        if (this.refs.selector.value == this.props.address.length) {
            this.dispatch(changeAddress(e.target.value.trim()));
        }
    }

    handlePurchase() {
        this.dispatch(purchase());
    }

    render() {
        var addressInput = (
            <input type="text" ref="text" onChange={this.handleChangeText.bind(this)} placeholder="Input your address..." className="form-control"/>
        )
        return (
            <div className="panel-body">
                <p>
                    <label for="addressSelector"><b>Choose your address</b></label>
                    <select id="addressSelector" ref="selector" className="form-control" onChange={this.handleChange.bind(this)}>
                        {
                            this.props.address.map((item, index) => {
                                return <option key={index} value={index}>{item.value}</option>
                            })
                        }
                        <option value={this.props.address.length}>Custom</option>
                    </select>
                    { ((enable) => {
                        if (enable) return addressInput;
                    })(this.state.selected == this.props.address.length) }
                </p>
                <p>
                    <button className="btn btn-success" onClick={this.handlePurchase.bind(this)}>
                        <span aria-hidden="true" className="glyphicon glyphicon-shopping-cart"></span>
                        <span> Purchase</span>
                    </button>
                </p>
            </div>
        )
    }
}
