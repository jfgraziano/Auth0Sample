import React, {Component} from 'react';
import AUth from '../Auth';

export default class Callback extends Component{

componentDidMount() {
    const auth = new AUth();
    auth.handleAuthentication();
    
}

    render(){
        return(
            <div>
                Loading...
        </div>
        )
    }
}