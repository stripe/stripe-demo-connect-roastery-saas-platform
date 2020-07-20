import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import StripeBanner from '../components/stripeBanner';

class Home extends React.Component {
  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Welcome"
        isSplashPage="true"
      >
        <div className="home">
          <div className="container">
            <div className="text">
              <h1>Manage your coffee roastery with ease.</h1>
              <h2>
                Build your online business. Roastery helps coffee roasters build
                their online presence and reach more buyers.
              </h2>
              <Link href="/signup">
                <a className="btn btn-primary">Start today</a>
              </Link>
            </div>
          </div>

          <StripeBanner />
        </div>
        <style jsx>{`
          .home {
            display: flex;
            height: 100%;
            align-items: center;
            padding-bottom: 30%;
          }

          h1 {
            font-size: 40px;
            font-weight: 600;
            color: #fff;
            width: 70%;
            margin-bottom: 30px;
          }

          h2 {
            font-size: 20px;
            font-weight: 600;
            color: #fff;
            width: 60%;
            margin-bottom: 30px;
          }

          .text {
            padding: 20px;
            position: relative;
            width: 100%;
            border: 0;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;
