
import React from 'react';
import { addMenu } from '../redux/menuSelector';

export default class MenuList extends React.Component {
    handleMenuClick(value) {
        this.props.dispatch(addMenu(value));
    }

    render() {
        return (
            <div>
            {
                this.props.menus.map((item, i) => {
                    return (
                        <div key={i}>
                            <b>{ item.name } (${item.price}) </b>
                            <a href="javascript:;" onClick={this.handleMenuClick.bind(this, item.id)}>Add</a><br />
                        </div>
                    )
                })
            }
            </div>
        );
    }
}
