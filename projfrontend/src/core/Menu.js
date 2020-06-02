import React from 'react'
import {Link, withRouter} from 'react-router-dom'


const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc72"}
    }
    else{
        return {color: "#FFFFFF"}
    }
}
//if we use () we do not have to use return otherwise if we use {} a return is must
const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab(history, "/")} classname="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/cart")} classname="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/user/dashboard")} classname="nav-link" to="/user/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/admin/dashboard")} classname="nav-link" to="/admin/dashboard">
                    A. Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/signup")} classname="nav-link" to="/signup">
                    Signup
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/signin")} classname="nav-link" to="/signin">
                    Sign In
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/signout")} classname="nav-link" to="/signout">
                    Signout
                </Link>
            </li>
        </ul>
    </div>
)

export default withRouter(Menu);
//withRouter picks up all the route links from Routes.js