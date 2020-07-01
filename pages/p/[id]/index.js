import React from 'react';
import Link from 'next/link';
import PlatformLayout from '../../../components/platformLayout';
import PlatformNav from '../../../components/platformNav';
import API from '../../../helpers/api';

export default class PlatformHome extends React.Component {
  static async getInitialProps(context) {
    let platformSlug = context.query.id;
    let platform = await API.makeRequest(
      'get',
      '/api/platforms/slug/' + platformSlug,
    );

    return {
      platform: platform,
    };
  }

  render() {
    return (
      <PlatformLayout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title={this.props.platform.name}
        hideNavigation={true}
      >
        <div className="platform-home">
          <div className="row full-height">
            <div className="col-lg-6 no-spacer">
              <div className="platform-image"></div>
            </div>

            <div className="col-lg-6">
              <PlatformNav platform={this.props.platform} />

              <div className="text-wrap">
                <div className="text">
                  <h1>Coffee roasted by hand.️</h1>
                  <Link href={'/p/' + this.props.platform.slug + '/products'}>
                    <a className="btn btn-primary">Shop now</a>
                  </Link>
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
            width: 100%;
            padding: 0;
            margin: 0 0 30px 0;
          }

          .text-wrap {
            display: flex;
            align-content: center;
            align-items: center;
            height: 100%;
            margin-top: -130px;
          }

          .text {
            max-width: 330px;
            margin: 0 auto;
          }

          .no-spacer {
            padding: 0;
          }
        `}</style>
      </PlatformLayout>
    );
  }
}
