/* eslint no-restricted-globals: 0*/
import auth0 from "auth0-js";
import jwt_decode from "jwt-decode";

const LOGIN_SUCCESS_PAGE = "/secret";
const LOGIN_FAILURE_PAGE = "/";

export default class AUth {
    auth0 = new auth0.WebAuth({
        domain: 'dev-jfgraziano.auth0.com',
        clientID: 'o0AJdm4XRB0OmRWa0FFxqdYVw1NqGxs1',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://dev-jfgraziano.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid profile' 
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login () {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResults) => {
            if(authResults && authResults.accessToken && authResults.idToken){
                let expiresAt = JSON.stringify(authResults.expiresIn = 1000 + new Date().getTime());
                let issuedAt = JSON.stringify(authResults.issuedAt = 1000 + new Date().getTime());
                localStorage.setItem("acess_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("issued_at", issuedAt);
                localStorage.setItem("expires_at", expiresAt);
                location.hash = "";
                location.pathname = LOGIN_SUCCESS_PAGE;
            }
            else if (err) {
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        })
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        let issuedAt = JSON.parse(localStorage.getItem("issued_at"));
        //return this.auth0.isAuthenticated;
        //return new Date().getTime() < expiresAt;
        return issuedAt < new Date().getTime() < expiresAt;
    }

    logout(){
        this.auth0.logout();
        localStorage.removeItem("acess_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("issued_at");
        location.pathname = LOGIN_FAILURE_PAGE;
    }

    getProfile() {
        if(localStorage.getItem("id_token")){
            return jwt_decode(localStorage.getItem("id_token"));
        }
        else {
            return {};
        }
    }
}