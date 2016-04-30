
import React from 'react';
import { cookOrder } from '../redux/orders'

export default class Orders extends React.Component {
    handleCook() {
        this.props.dispatch(cookOrder(this.props.order_id));
    }

    render() {
        var button = (
            <button onClick={this.handleCook.bind(this)} className="btn btn-success">Cook</button>
        );
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Order#{this.props.order_id}</h3>
                    <p><b>Process: </b>{this.props.process} (ordered on {this.props.time_ordered})</p>
                    <p><b>Customer: </b>{this.props.customer}</p>
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
                    <p><b>Price: </b>${ this.props.price } (discount: ${this.props.discount})</p>
                    <p>
                        { button }
                    </p>
                </div>
            </div>
        )
    }
}
