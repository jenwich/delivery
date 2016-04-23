
import React from 'react';
import { changeStore } from '../redux/store';

export default class Store extends React.Component {
    handleChange(e) {
        var store_id = e.target.value;
        this.props.store.dispatch(changeStore(store_id));
    }

    render() {
        return (
            <select id="storeSelector" className="form-control" onChange={this.handleChange.bind(this)}>
                {
                    this.props.stores.map(store => {
                        return <option key={store.store_id} value={store.store_id}>{store.name}</option>
                    })
                }
            </select>
        )
    }
}
