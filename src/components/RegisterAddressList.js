
import React from 'react';
import { addAddress, changeAddress, deleteAddress } from '../actions/registerActions';

export default class RegisterAddressList extends React.Component {
    handleAddAddress() {
        this.props.dispatch(addAddress());
    }

    deleteItem(i) {
        this.props.dispatch(deleteAddress(i));
    }

    changeItem(i) {
        var value = this.refs[`box${i}`].value.trim();
        this.props.dispatch(changeAddress(i, value));
    }

    render() {
        return (
            <ul>{
                    this.props.list.map((item, i) => {
                        return (
                            <li key={ item.id }>
                                <input type="text" ref={ `box${i}` } onChange={ this.changeItem.bind(this, i) }/>
                                <button onClick={ this.deleteItem.bind(this, i) }>Delete</button>
                            </li>
                        );
                    })
                }
                <button onClick={ this.handleAddAddress.bind(this) }>Add</button>
            </ul>
        );
    }
}
