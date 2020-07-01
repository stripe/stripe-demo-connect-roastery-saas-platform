import React from 'react';
import Link from 'next/link';
import PlatformLayout from '../../../components/platformLayout';
import PlatformNav from '../../../components/platformNav';
import API from '../../../helpers/api';
import moment from 'moment';

export default class PlatformThankYou extends React.Component {
  static async getInitialProps(context) {
    let platform = await API.makeRequest(
      'get',
      `/api/platforms/slug/${context.query.id}`,
    );

    let session = await API.makeRequest(
      'get',
      `/api/purchase/${context.query.sessionId}?platformId=${platform.platformId}`,
    );

    return {
      platform: platform,
      session: session,
    };
  }

  render() {
    return (
      <PlatformLayout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title={'Thank you - ' + this.props.platform.name}
        platform={this.props.platform}
      >
        <div className="platform-home">
          <div className="row full-height">
            <div className="col-lg-6">
              <div className="text-wrap">
                <div className="text">
                  <h3>
                    Thank you. <br /> Your order is confirmed.
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-lg-6 order">
              <div className="nav-box">
                <PlatformNav platform={this.props.platform} />
              </div>

              <div className="text-wrap">
                <div className="order-details">
                  <div className="items">
                    <div className="row">
                      <div className="col-6">Order number:</div>
                      <div className="col-6">JBM-29172304</div>
                    </div>
                    <div className="row">
                      <div className="col-6">Order date:</div>
                      <div className="col-6">
                        {moment().format('MM/DD/YYYY')}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">Bill to:</div>
                      <div className="col-6">
                        {this.props.session.shipping.address.line1} <br />
                        {this.props.session.shipping.address.line2} <br />
                        {this.props.session.shipping.address.city},{' '}
                        {this.props.session.shipping.address.state}{' '}
                        {this.props.session.shipping.address.postal_code} <br />
                        {this.props.session.shipping.address.country}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">Ship to:</div>
                      <div className="col-6">
                        {this.props.session.shipping.address.line1} <br />
                        {this.props.session.shipping.address.line2} <br />
                        {this.props.session.shipping.address.city},{' '}
                        {this.props.session.shipping.address.state}{' '}
                        {this.props.session.shipping.address.postal_code} <br />
                        {this.props.session.shipping.address.country}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">Payment Method:</div>
                      <div className="col-6">
                        {this.props.session.payment_method_types[0]}
                      </div>
                    </div>
                  </div>
                  <p>
                    We’re working on your order. We’ll email you with tracking
                    information once your items have shipped. If we’re unable to
                    fulfill your order, we’ll let you know right away. Need
                    assistance? Contact us or call us toll-free at
                    1-888-782-1209.
                  </p>

                  <p>
                    <Link href={'/p/' + this.props.platform.slug + '/'}>
                      <a className="btn btn-primary"> Continue shopping</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .platform-home {
            width: 100%;
            height: 100%;
          }

          .platform-image {
            height: 100%;
            width: 100%;

            background: url(/static/platform_splash.png) no-repeat;
            background-size: cover;
            background-position: center center;
          }

          h1 {
            font-size: 70px;
            font-weight: 600;
            color: #202020;
            width: 70%;
            padding: 0;
            margin: 0 0 30px 0;
          }

          h3 {
            font-size: 36px;
            line-height: 50px;
            color: #1a1f36;
          }

          p {
            margin-bottom: 40px;
          }

          .text-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }

          .order {
            background: #fff;
            position: relative;
            padding-top: 100px;
          }

          .items {
            max-width: 400px;
            padding-bottom: 40px;
          }

          .items .row {
            border-bottom: 1px solid #e3e8ee;
            padding: 10px 0;
          }

          .order-details {
            max-width: 500px;
            margin: 0 auto;
            font-size: 14px;
          }

          .text {
            max-width: 500px;
            margin: 0 auto;
          }

          .nav-box {
            position: absolute;
            left: 15px;
            right: 15px;
            top: 0;
          }
        `}</style>
      </PlatformLayout>
    );
  }
}
