import React, {Component} from 'react';

export default class Main extends Component{
    render(){
        return(
            <div>
            <p>
          Edit <code>src/App.js</code> and save to reload. This is {this.props.name} from Main
          Do you want so see the secret area? <a href="/secret">Click Here</a>
        </p>
        <div>
            <hr></hr>
            Please login first
            <br/>
            <button onClick={this.props.auth.login}>Login</button>
            <button onClick={this.props.auth.logout}>Logout</button>
        </div>
        </div>
        )
    }
}