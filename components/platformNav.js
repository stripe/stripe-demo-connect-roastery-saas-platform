import React from 'react';
import Link from 'next/link';
import NavProfile from './navProfile';

class PlatformNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav mr-auto">
            <li className="navitem d-flex">
              <Link href={'/p/' + this.props.platform.slug}>
                <a className="navbar-brand">
                  <div className="brand">
                    Mission <br /> Coffee <br />
                    Co.
                  </div>
                </a>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav flex-row">
            <li className="navitem d-flex">
              <Link href={'/p/' + this.props.platform.slug + '/products'}>
                <a className="btn">Wholesale</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={'/p/' + this.props.platform.slug + '/contact'}>
                <a className="btn">Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
        <style jsx>{`
          .navigation {
            margin: 10px 0;
          }
          .navbar {
            margin: 0;
            padding: 0;
            height: 70px;
          }

          .navbar-brand {
            display: flex;
            align-content: center;
          }

          .logo {
            align-self: center;
          }

          .brand {
            background: #7cbfbb;
            width: 60px;
            height: 60px;
            padding: 5px;

            word-wrap: break-word;
            color: #fff;
            font-size: 12px;
            line-height: 16px;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }
}
export default PlatformNav;
