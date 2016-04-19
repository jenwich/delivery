import React from 'react';
import * as actions from '../redux/storeSelector';

export default class StoreSelector extends React.Component {
    componentWillMount() {
        this.setState(this.props.store.getState());
        this.dispatch = this.props.store.dispatch;
        this.unsub = this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
        this.setState({
            addressselected: 0
        });
    }

    componentWillUnmount() {
        this.unsub();
    }

    handleChangeAddress(e) {
        var selected = parseInt(e.target.value);
        this.setState({
            addressselected: selected
        });
    }

    handleNext() {
        var store = parseInt(this.refs.store.value);
        var addressSelected = parseInt(this.refs.address.value);
        var addressInput = this.refs.addressInput.value.trim();
        var address = (addressSelected == this.props.address.length)? addressInput: this.props.address[addressSelected].address;

        this.dispatch(actions.next(store, address));
    }

    render() {
        var textboxDisable = this.state.addressselected != this.props.address.length;
        return (
            <div>
                <span>Store</span>
                <select ref="store">
                    {
                        this.props.stores.map((store, index) => {
                            return <option key={ store.id } value={ store.id }>{ store.name }</option>
                        })
                    }
                </select>
                <br />
                <span>Address</span>
                <select ref="address" onChange={this.handleChangeAddress.bind(this)}>
                    {
                        this.props.address.map((item, index) => {
                            return <option key={ item.id } value={ index }>{ item.address }</option>
                        })
                    }
                    <option value={ this.props.address.length }>Other</option>
                </select>
                <input type="text" ref="addressInput" disabled={ textboxDisable }/>
                <br />
                <button onClick={this.handleNext.bind(this)}>Next</button>
                { this.state.storeSelector.message }
            </div>
        );
    }
}
