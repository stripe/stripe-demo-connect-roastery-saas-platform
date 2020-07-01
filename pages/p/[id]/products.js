import React from 'react';
import Link from 'next/link';
import API from '../../../helpers/api';
import PlatformProductsList from '../../../components/platformProductsList';
import PlatformNav from '../../../components/platformNav';
import PlatformLayout from '../../../components/platformLayout';

export default class PlatformProducts extends React.Component {
  static async getInitialProps(context) {
    let platformSlug = context.query.id;

    let platform = await API.makeRequest(
      'get',
      '/api/platforms/slug/' + platformSlug,
    );

    let products = await API.makeRequest(
      'get',
      '/api/products/platform/' + platformSlug,
    );

    return {
      platform: platform,
      products: products,
    };
  }

  render() {
    return (
      <PlatformLayout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        platform={this.props.platform}
        title={'Products - ' + this.props.platform.name}
      >
        <div className="platform-products">
          <div className="container-fluid">
            <PlatformNav platform={this.props.platform} />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1>Our wholesale products</h1>
                <PlatformProductsList
                  list={this.props.products}
                  platform={this.props.platform}
                />
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .platform-products {
            width: 100%;
          }

          h1 {
            font-size: 20px;
            font-weight: bold;
            color: #1a1f36;
            padding: 0;
            margin: 0 auto 100px auto;

            text-align: center;
          }
        `}</style>
      </PlatformLayout>
    );
  }
}
