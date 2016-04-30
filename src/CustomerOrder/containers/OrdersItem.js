
import React from 'react';
import { receiveOrder } from '../redux/orders'

export default class Orders extends React.Component {
    handleReceive() {
        this.props.dispatch(receiveOrder(this.props.order_id));
    }

    render() {
        var button = (
            <button disabled={ this.props.process == 'ordered'} onClick={this.handleReceive.bind(this)} className="btn btn-success">Receive</button>
        );
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Order#{this.props.order_id}</h3>
                    <p>Process: {this.props.process}</p>
                    <p>Store: {this.props.store_id}</p>
                    <p>Address: {this.props.address}</p>
                    <p>Menus:</p>
                    <ul>
                        {
                            this.props.menus.map(menu => {
                                return (
                                    <li key={menu.menu_id}>
                                        <span>{menu.name}</span>
                                        <span> (x{menu.amount})</span>
                                        <span> (${(menu.price * menu.amount).toFixed(2)})</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <p>Price: ${ this.props.price } (discount: ${this.props.discount})</p>
                    <p>
                        {
                            ((enable) => {
                                if (enable) return button;
                            })(this.props.process != 'received')
                        }
                    </p>
                </div>
            </div>
        )
    }
}
