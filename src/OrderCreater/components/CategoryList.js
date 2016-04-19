
import React from 'react';
import { selectCategory } from '../redux/menuSelector';

export default class CategoryList extends React.Component {
    handleCategoryClick(value) {
        this.props.dispatch(selectCategory(value));
    }

    render() {
        return (
            <ul>
                <li><a href="javascript:;" onClick={this.handleCategoryClick.bind(this, "")}>All</a></li>
            {
                this.props.categories.map((item, i) => {
                    return (
                        <li key={i}>
                            <a href="javascript:;" onClick={this.handleCategoryClick.bind(this, item)}>{item}</a>
                        </li>
                    )
                })
            }
            </ul>
        );
    }
}
