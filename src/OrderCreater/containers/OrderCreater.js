
import React from 'react';
import StoreSelector from '../containers/StoreSelector';
import MenuSelector from '../containers/MenuSelector';
import { next } from '../redux/appProcess';

export default class NewOrder extends React.Component {
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

    handleCreate() {
        this.dispatch(next());
    }

    render() {
        return (
            <div>
            {
                ((pc) => {
                    switch (pc) {
                        case 'waiting': return (<button onClick={this.handleCreate.bind(this)}>Create</button>);
                        case 'select_store': {
                            var availableProps = {
                                stores: this.props.stores,
                                address: this.props.address
                            }
                            return(<StoreSelector store={this.props.store} {...availableProps} />);
                        };
                        case 'select_menu': {
                            var availableProps = {
                                menus: this.props.menus,
                                categories: this.props.categories
                            }
                            return(<MenuSelector store={this.props.store} {...availableProps} />);
                        }
                        default: return null;
                    }
                })(this.state.appProcess)
            }
            </div>
        );
    }
}
