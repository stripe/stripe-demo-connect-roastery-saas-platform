import {Component} from 'react';
import API from '../helpers/api';
import logger from '../helpers/logger';

class StripeSetup extends Component {
  constructor(props) {
    super(props);

    this.handleConnect = this.handleConnect.bind(this);
  }

  async getRedirectInfo() {
    return API.makeRequest('post', `/api/payouts/stripe`);
  }

  async handleConnect() {
    logger.log('ProfileStripe.handleConnect');
    let response = await this.getRedirectInfo();
    let url = response.location;
    if (url) {
      window.location.href = url;
    }
  }

  render() {
    let signUpLink = '/api/stripe/connect';

    return (
      <>
        <div className="stripe-setup">
          <h3>Connect your Stripe account</h3>
          <p>We are using Stripe to for payments and payouts.</p>

          <div className="stripe-box">
            <img src="/stripe_blue.svg" />
          </div>

          <a
            className="btn btn-primary text-center btn-full"
            onClick={this.handleConnect}
            href="#"
          >
            Connect Stripe
          </a>

          <p className="text-center notice">
            You'll be redirected to Stripe for onboarding
          </p>
        </div>
        <style jsx>{`
          .stripe-setup {
          }

          .stripe-box {
            height: 300px;
            width: 300px;
            margin: 0 auto;

            display: flex;
            align-items: center;
          }

          .stripe-box img {
            margin: 0 auto;
          }

          h3 {
            font-weight: bold;
            font-size: 100%;
          }

          p {
            line-height: 22px;
          }

          .box .btn {
            width: 100%;
            margin-bottom: 20px;
            margin-top: 16px;
          }

          .notice {
            padding-top: 10px;
            font-size: 12px;
            line-height: 1.5;
          }

          .box h3 {
            margin-bottom: 20px;
          }
        `}</style>
      </>
    );
  }
}

export default StripeSetup;
