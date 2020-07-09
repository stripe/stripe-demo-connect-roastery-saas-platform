import React from 'react';
import Link from 'next/link';
import NavProfile from './navProfile';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let logoSrc = '/logo.svg';
    let navClass = 'navbar navbar-fixed navbar-expand-lg';

    if (this.props.isDashboard) {
      logoSrc = '/logo_dark.svg';
      navClass += ' navbar-light';
    } else {
      navClass += ' navbar-dark';
    }

    return (
      <div className="navigation container">
        <nav className={navClass}>
          <ul className="navbar-nav mr-auto">
            <li className="navitem d-flex">
              <Link href="/">
                <a className="navbar-brand">
                  <img className="logo" src={logoSrc} />
                </a>
              </Link>
            </li>
          </ul>

          <NavProfile
            isAuthenticated={this.props.isAuthenticated}
            userProfile={this.props.userProfile}
          />

          <style jsx>{`
            .navbar {
              margin: 32px 0 32px 0;
              padding: 0;
              height: 45px;
              color: #fff;
            }

            .navbar-brand {
              display: flex;
              align-content: center;
            }

            .logo {
              align-self: center;
            }
          `}</style>
        </nav>
      </div>
    );
  }
}
export default Nav;
