import React, { Component } from 'react'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logic: true,
        }
    }

    render() {
        return (<div>
            <h1 className='text-center'>Home</h1>
        </div>);
    }
}

export default Home;