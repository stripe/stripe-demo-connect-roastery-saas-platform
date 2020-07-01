import React from 'react';
import {redirect} from '../../utils/redirect';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import DashboardPlatformSettings from '../../components/dashboardPlatformSettings';
import DashboardHeader from '../../components/dashboardHeader';

class Dashboard extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    let userProfile = await API.makeRequest('get', '/api/profile');
    let userPlatform = await API.makeRequest('get', '/api/profile/platform');
    let products = await API.makeRequest('get', '/api/products');

    return {
      profile: userProfile,
      platform: userPlatform,
      products: products,
      dashboardType: 'settings',
    };
  }

  disconnectStripeAccount = async () => {
    await API.makeRequest('post', '/api/profile/disconnect_stripe');
    redirect('/dashboard/settings');
  };

  componentDidMount() {
    // TODO: Move this to a server side check
    if (!this.props.isAuthenticated) {
      redirect('/login');
    }
  }

  render() {
    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Platform settings"
        isDashboard="true"
      >
        <div className="dashboard">
          <DashboardHeader
            profile={this.props.profile}
            platform={this.props.platform}
            dashboardType={this.props.dashboardType}
          />

          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-8">
                  <div className="clearfix">
                    <h3>Platform settings</h3>
                  </div>
                </div>
              </div>

              <DashboardPlatformSettings platform={this.props.platform} />

              {this.props.platform.stripe && (
                <>
                  <h3>Stripe</h3>
                  <button
                    type="submit"
                    className="btn-submit btn btn-secondary"
                    onClick={this.disconnectStripeAccount}
                  >
                    Disconnect Stripe account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <style jsx>{`
          .dashboard {
            padding-bottom: 50px;
          }
          .dashboard h3 {
            font-size: 14px;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 30px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Dashboard;
