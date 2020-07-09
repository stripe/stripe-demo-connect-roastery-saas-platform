import React from 'react';
import Link from 'next/link';
import PlatformLayout from '../../../components/platformLayout';
import PlatformNav from '../../../components/platformNav';
import API from '../../../helpers/api';

export default class PlatformContact extends React.Component {
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
    let platform = this.props.platform;
    return (
      <PlatformLayout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title={'Contact - ' + platform.name}
        platform={platform}
        hideNavigation={true}
      >
        <div className="platform-home">
          <div className="row full-height">
            <div className="col-lg-6 no-spacer">
              <div className="platform-image"></div>
            </div>

            <div className="col-lg-6">
              <PlatformNav platform={platform} />

              <div className="text-wrap">
                <div className="text">
                  <div className="platform-details">
                    <div className="row-one">
                      <strong>{platform.name}</strong>
                      <p className="text-secondary">
                        {platform.address} <br />
                        {platform.city} {platform.state} {platform.zip} <br />
                        <br />
                        {platform.phone} <br />
                        {platform.email} <br />
                      </p>
                    </div>
                  </div>
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

            background: url(/platform_splash.png) no-repeat;
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

          .text-wrap {
            display: flex;
            align-content: center;
            align-items: center;
            height: 100%;
            margin-top: -130px;
          }

          .text {
            max-width: 500px;
            margin: 0 auto;
          }

          .no-spacer {
            padding: 0;
          }

          @media (min-width: 768px) {
            .popover {
              padding: 40px;
              width: 500px;
              max-width: 500px;
            }
          }
        `}</style>
      </PlatformLayout>
    );
  }
}
