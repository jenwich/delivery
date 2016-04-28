
import React from 'react';
import { addMenu } from '../redux/menus';

export default class Menu extends React.Component {
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

    handleAdd(menu_id) {
        this.dispatch(addMenu(menu_id));
    }

    render() {
        var menus = this.state.menus.filter(menu => (this.state.category.selected == 'All' || menu.category == this.state.category.selected));
        var menuComponents = menus.map((menu, index) => {
            var storeName = this.props.stores.reduce((name, store, index) => {
                return (store.store_id == menu.store_id)? store.name: name;
            }, "");

            return (
                <div className="row panel-body" key={menu.menu_id}>
                    <div className="col-sm-3">
                        <div className="thumbnail"><img src={'/img/menu_'+menu.menu_id+'.jpg'} alt={menu.name}/></div>
                    </div>
                    <div className="col-sm-7">
                        <h4>{menu.name}</h4>
                        <p>{menu.description}<br/>
                            <b>Store: </b><span>{storeName}</span><br/>
                            <b>Category: </b><span>{menu.category}</span><br/>
                        </p>
                    </div>
                    <div className="col-sm-2">
                        <p><b>Price: </b><span>${menu.price}</span></p>
                        <p>
                            <button href="#" role="button" className="btn btn-primary" onClick={this.handleAdd.bind(this, menu.menu_id)}>
                                <span aria-hidden="true" className="glyphicon glyphicon-plus"></span>
                                <span> &nbsp;Add</span>
                            </button>
                        </p>
                    </div>
                </div>
            );
        })
        return (
            <div className="panel panel-default">{menuComponents}</div>
        )
    }
}
