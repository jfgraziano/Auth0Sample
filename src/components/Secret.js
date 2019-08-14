import React, {Component} from 'react';

export default class Secret extends Component{
    render(){
        return(
            <div>
            <p>
          This is a secret area. Jump back to <a href="/">Home</a>
          <br />
            <button onClick={this.props.auth.logout}>Logout</button>
        </p>
        </div>
        )
    }
}