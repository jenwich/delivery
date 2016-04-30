
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
        var time_str = "";
        if (this.props.process == 'ordered') {
            time_str = 'ordered on ' + this.props.time_ordered;
        } else if (this.props.process == 'sending') {
            time_str = 'sent on ' + this.props.time_cooked;
        }
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Order#{this.props.order_id}</h3>
                    <p><b>Process:</b> {this.props.process} ({time_str})</p>
                    <p><b>Store: </b>{this.props.store_name}</p>
                    <p><b>Address: </b>{this.props.address}</p>
                    <p><b>Menus:</b></p>
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
                    <p><b>Price: </b>${ this.props.price.toFixed(2) } (discount: ${this.props.discount.toFixed(2)})</p>
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
