
import React from 'react';
import OrdersItem from './OrdersItem'

export default class Orders extends React.Component {
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

    render() {
        return (
            <div>
                {
                    this.state.orders.map((order, index) => {
                        return <OrdersItem key={order.order_id} {...order} dispatch={this.dispatch}/>
                    })
                }
            </div>
        )
    }
}
