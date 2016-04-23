
import React from 'react';
import { changeCategory } from '../redux/category';

export default class Category extends React.Component {
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

    handleClick(i) {
        var value = (i == 0)? "All": this.state.category.values[i-1];
        this.dispatch(changeCategory(value))
    }

    render() {
        return (
            <ul className="nav nav-pills">
                <li role="presentation" className={ (this.state.category.selected == 'All')? 'active': '' }>
                    <a href="javascript:;" onClick={this.handleClick.bind(this, 0)}>All</a>
                </li>
                {
                    this.state.category.values.map((category, index) => {
                        return (
                            <li role="presentation" key={index+1} className={ (this.state.category.selected == category)? 'active': '' }>
                                <a href="javascript:;" onClick={this.handleClick.bind(this, index+1)}>{category}</a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
