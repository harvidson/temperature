import React from 'react';

const App = () => {
return(
  <div>

    <header className="sans-serif">
    <div className="cover bg-left bg-center-l w-100" style={{backgroundImage:'url(static/images/kluber.jpg)'}}>
      <div className="bg-black-05 pb5 pb6-m pb7-l">
        <nav className="dt w-100 mw8 center">

          <div className="dtc v-mid tr pa3">
            <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >How it Works</a>
            <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Pricing</a>
            <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >About</a>
            <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >Careers</a>
            <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" href="/" >Sign Up</a>
          </div>
        </nav>
        <div className="tc-l mt4 mt5-m mt6-l ph3">
          <div className="mt5">
            <img src="/static/images/temperature-logo.png" alt="logo" width="600px"/>

          </div>
          <h2 className="fw3 f3 white-80 mb4">Take the temperature of any room.</h2>
          <a className="f6 no-underline grow dib v-mid white ba ph3 pv2 mb3 action-button" href="/">Get started</a>
        </div>
      </div>
    </div>
  </header>
  </div>

)

};

export default App;
