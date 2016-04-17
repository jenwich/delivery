
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
            <div className="form-group">
                <label className="col-sm-3 control-label">Address</label>
                <div className="col-sm-9">
                    {   this.props.list.map((item, i) => {
                            return (
                                <div className="input-group" key={ item.id }>
                                    <input type="text" ref={ `box${i}` } onChange={ this.changeItem.bind(this, i) } className="form-control"/>
                                    <span className="input-group-btn">
                                        <button type="button" onClick={ this.deleteItem.bind(this, i) } className="btn btn-default">Delete</button>
                                    </span>
                                </div>
                            );
                        })
                    }
                    <div>
                        <button type="button" onClick={ this.handleAddAddress.bind(this) } className="btn btn-default">Add new address</button>
                    </div>
                </div>
            </div>
        );
    }
}
