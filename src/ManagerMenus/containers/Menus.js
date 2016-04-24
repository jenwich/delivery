
import React from 'react';
import { changeAvailable } from '../redux/menus'

export default class Menus extends React.Component {
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

    handleCheck(e) {
        this.dispatch(changeAvailable(e.target.value, e.target.checked));
    }

    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th width="10%">#</th>
                        <th>Menu Name</th>
                        <th width="10%">Available </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.menus.map(menu => {
                            return (
                                <tr key={menu.menu_id}>
                                    <td>{menu.menu_id}</td>
                                    <td>{menu.name}</td>
                                    <td>
                                        <input type="checkbox" checked={menu.available} value={menu.menu_id} onChange={this.handleCheck.bind(this)}/>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        )
    }
}
