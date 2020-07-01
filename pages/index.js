import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';

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
              <Link href="/signup">
                <a className="btn btn-primary">Get started</a>
              </Link>
            </div>
          </div>

          <div className="annotation">
            <p>
              <img src="static/stripe.svg" width="60" />
              Roastery is a{' '}
              <a className="stripe" href="https://stripe.com">
                Stripe
              </a>{' '}
              demo that uses{' '}
              <a href="https://stripe.com/connect" target="_blank">
                Connect
              </a>{' '}
              to build a SaaS platfrom.{' '}
              <a
                className="github arrow"
                href="https://github.com/stripe/stripe-demo-connect-standard-saas-platform"
                target="_blank"
              >
                View on GitHub
              </a>
            </p>
          </div>
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

          .text {
            padding: 20px;
            position: relative;
            width: 100%;
            border: 0;
          }

          .annotation {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            min-height: 50px;

            background: #fff;
            text-align: center;
            font-size: 12px;
          }

          .annotation img,
          .annotation a,
          .annotation p {
            display: inline-block;
            margin: 0;
          }

          .annotation img {
            margin-right: 10px;
          }

          .annotation a:link,
          .annotation a:visited {
            color: #32325d;
          }

          @media (min-width: 768px) {
            .annotation {
              max-width: 700px;
              margin-left: auto;
              margin-right: auto;
              bottom: 30px;
              border-radius: 50px;
              padding: 10px;
            }

            h1 {
              font-size: 60px;
            }
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;
