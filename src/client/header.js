import React from 'react';

class Header extends React.Component {
  constructor() {
    super()

    this.state = {

    }
    this.logout = this.logout.bind(this);
  }

  logout() {
    //delete token
      fetch('/api/token', {
        method: 'delete',
        credentials: 'include'
        })
      .then((response) => {
        return response.json();
      }).then((j) => {
        console.log(j)
      }).catch((err) => {
        console.log(err)
      })
  }

  render() {
    return(
      <header>
      <div className="bg-dark-gray bg-left bg-center-l w-100" >

        <div className="cf">
          <img className="ml2 pa3 fl" src="static/images/temperature-logo.png" width="150px"/>
          <nav className="w-100 mv3">
            <div className="v-mid tr pv3 mr3 fr">
              <a className="f6 fw4 hover-white no-underline white-70 dib pv2 ph3 ba br1 link" href="/" onClick={this.logout}>Log out</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
    )
  }
}






















export default Header;