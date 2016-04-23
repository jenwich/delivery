
import React from 'react';
import { removeMenu } from '../redux/cart';

export default class Cart extends React.Component {
    componentWillMount() {
        this.setState(this.props.store.getState());
        this.dispatch = this.props.store.dispatch;
        this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
    }

    componentWillUnmount() {
        this.unsub();
    }

    handleRemove(menu_id) {
        this.dispatch(removeMenu(menu_id));
    }

    render() {
        return (
            <table className="table">
                <tbody>
                    {
                        this.state.cart.menus.map((menu) => {
                            return (
                                <tr key={menu.menu_id}>
                                    <td width="">{menu.name}</td>
                                    <td width="10%">{menu.amount}</td>
                                    <td width="20%">${menu.price}</td>
                                    <td width="10%">
                                        <button className="btn btn-danger btn-xs" onClick={this.handleRemove.bind(this, menu.menu_id)}>
                                            <span aria-hidden="true" className="glyphicon glyphicon-minus"></span>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td colSpan="2">Total</td>
                        <td colSpan="2">${this.state.cart.total}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">Discount</td>
                        <td colSpan="2">${this.state.cart.discount}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">Summary</td>
                        <td colSpan="2">${this.state.cart.summary}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
