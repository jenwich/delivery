import React from 'react';
import ReactDOM from 'react-dom';

class Sample extends React.Component {
    render() {
        return (
            <div>Hello from React</div>
        );
    }
};

ReactDOM.render(<Sample />, document.getElementById('app'));
