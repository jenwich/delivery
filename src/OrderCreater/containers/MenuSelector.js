
import React from 'react';
import CategoryList from '../components/CategoryList';
import MenuList from '../components/MenuList';
import Cart from '../components/Cart';
import { submit } from '../redux/menuSelector';

export default class MenuSelector extends React.Component {
    componentWillMount() {
        this.setState(this.props.store.getState());
        this.dispatch = this.props.store.dispatch;
        this.unsub = this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
        window.dispatch = this.dispatch;
    }

    componentWillUnmount() {
        this.unsub();
    }

    handleSubmit() {
        this.dispatch(submit())
    }

    render() {
        var menus = this.props.menus;
        if (this.state.menuSelector.category != "") {
            menus = menus.filter((menu) => {
                return menu.category == this.state.menuSelector.category;
            });
        }
        return (
            <div>
                <div>
                    <h2>Menus</h2>
                    <h3>Categories</h3>
                    <CategoryList dispatch={this.dispatch} categories={this.props.categories} />
                    <h3>Menus</h3>
                    <MenuList dispatch={this.dispatch} menus={menus} />
                </div>
                <div>
                    <h2>Cart</h2>
                    <Cart dispatch={this.dispatch} data={this.state.menuSelector.cart} menus={this.props.menus} />
                </div>
                <button onClick={this.handleSubmit.bind(this)}>Order</button>
                { this.state.menuSelector.message }
            </div>
        );
    }
}
