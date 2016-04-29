
import React from 'react';
import { addBalance } from '../redux/balance';

export default class Balance extends React.Component {
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

    handleAddBalance(amount) {
        this.dispatch(addBalance(amount));
    }

    render() {
        return (
            <div>
                <h3>My Balance: ${this.state.balance.toFixed(2)}</h3>
                <p>
                    {
                        this.props.amounts.map((item, index) => {
                            return (
                                <button key={index} onClick={this.handleAddBalance.bind(this, item)} className="btn btn-success" style={ { "marginRight": "10px" } }>Add ${item}</button>
                            );
                        })
                    }
                </p>
            </div>
        )
    }
}
