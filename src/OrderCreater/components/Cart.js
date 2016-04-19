
import React from 'react';
import { removeMenu } from '../redux/menuSelector';

export default class Cart extends React.Component {
    handleRemove(id) {
        this.props.dispatch(removeMenu(id));
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.data.menus.map((item) => {
                            var index = this.props.menus.reduce((i, j, k) => (j.id == item.id)? k: i, 0);
                            var name = this.props.menus[index].name
                            return (
                                <li key={item.id}>
                                    {name}*{item.amount}
                                    <a href="javascript:;" onClick={ this.handleRemove.bind(this, item.id)}>Remove</a>
                                </li>
                            );
                        })
                    }
                </ul>
                <div>
                    <b>sumPrice</b> ${this.props.data.sumPrice}<br />
                    <b>discount</b> ${this.props.data.discount}<br />
                    <b>finalPrice</b> ${this.props.data.finalPrice}<br />
                </div>
            </div>
        );
    }
}
