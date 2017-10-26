import React from 'react';

const App = () => {
  return (
    <div>

      <header className="sans-serif">
        <div className="cover bg-left bg-center-l w-100" style={{
          backgroundImage: 'url(static/images/kluber.jpg)'
        }}>
          <div className="bg-black-05 pb5 pb6-m pb7-l">
            <nav className="dt w-100 mw8 center">

              <div className="dtc v-mid tr pa3">
                <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3 link" href="/">About</a>
                <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3 link" href="/">Log in</a>
                <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba br1 link" href="/">Sign Up</a>
              </div>
            </nav>
            <div className="tc mt4 mt5-m mt6-l ph3">
              <div className="mt4">
                <img src="/static/images/temperature-logo.png" alt="logo" width="600px"/>

              </div>
              <h2 className="fw3 f3 white-80 mb4">Take the temperature of any room.</h2>
              <a className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1" href="/">Get started</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mv5 mh6">
          <h2 className="f1 fw3">Get candid data.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <div className="tc w-100">
            <a className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button br1" href="/">Get started</a>
          </div>

        </div>
        <hr/>
        <div className="mv5 mh6">
          <h2 className="f1 fw3">Why journal?</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <ul>
            <li><a href="#" className="link">Some study</a></li>
            <li><a href="#" className="link">Another study</a></li>
          </ul>

        </div>
      </main>

      <footer>
        <div className="footer cf w-100 center">
          <div className="fl w-40 pa2 tr pv3">
            <img src="/static/images/temperature-logo.png" alt="logo" width="150px"/>
          </div>
          <div className="fl w-25 pa2  ">
            <p className="white-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="fl w-25 pa2  ">
            <p className="white-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="fl w-15 pa2  ">

          </div>
        </div>
      </footer>

    </div>

  )

};

export default App;
