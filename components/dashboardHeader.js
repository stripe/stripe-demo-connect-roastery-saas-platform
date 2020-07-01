import React, {Component} from 'react';
import Link from 'next/link';
import API from '../helpers/api';

class DashboardHeader extends Component {
  constructor() {
    super();
  }

  async handleDashboardLink() {
    let req = await API.makeRequest('get', '/api/payouts/link');
    window.open(req.url);
  }

  render() {
    let {profile, platform} = this.props;
    let avatarUrl = profile ? profile.avatar : '/static/avatar.png';

    let formattedBalance = '';

    if (this.props.balance && this.props.balance) {
      const locale = new Intl.NumberFormat().resolvedOptions().locale;
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: this.props.balance.currency,
      });

      formattedBalance = formatter.format(this.props.balance.amount / 100);
    }

    return (
      <div className="dashboard-header">
        <div className="bg-overlay"></div>
        <div className="row">
          <div className="col-12">
            {profile && (
              <div className="media user-details">
                <img src={avatarUrl} className="mr-3 avatar" />
                <div className="media-body">
                  <div className="user-details-body align-middle">
                    <h5 className="mt-0">
                      {profile.firstName + ' ' + profile.lastName}
                    </h5>
                    <p className="text-secondary">{profile.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="platform-details">
              <div className="row-one">
                <strong>{platform.name}</strong>
                <p className="text-secondary">
                  {platform.address} <br />
                  {platform.city} {platform.state} {platform.zip}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="platform-details">
              <p>
                <strong>TEL:</strong> {platform.phone}
              </p>
              <p>
                <strong>Email:</strong> {platform.email}
              </p>
              <p>
                <strong>M-F:</strong> 10AM-8PM
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="settings">
              <nav>
                <a href={'/p/' + platform.slug} target="_blank">
                  Visit public site
                </a>{' '}
                <br />
                <a
                  href="https://dashboard.stripe.com/test/payments"
                  target="_blank"
                >
                  Recent orders
                </a>{' '}
                <br />
                <Link href="/dashboard/settings">
                  <a>Platform settings</a>
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <style jsx>{`
          .dashboard-header {
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 80px;
            padding-bottom: 0px;
            position: relative;
          }

          .bg-overlay {
            background: #F2F1E7;

            position: absolute;
            z-index: -1;
            height: 500px;
            top: -120px;
            left: -100%;
            right: -100%;
          }

          }
          .nav-tabs {
            margin: 20px 0;
            box-sizing: border-box;
          }

          .nav-link {
            text-align: left;
            box-sizing: border-box;
            font-size: 16px;
            font-weight: 600;
            padding: 0 8px 8px;
            margin-right: 24px;
            color: #484848;
            border-radius: 0;
          }

          .nav-link:hover {
            border: 1px solid #fff;
          }

          .nav-link.active {
            border: #fff;
            border-bottom: 1px solid #fff;
            padding-top: 1px;
            color: #0055ff;
          }
          
          .user-details {
            font-size: 14px;
            padding-bottom: 40px;
          }

          .user-details .avatar {
            height: 60px;
            width: 60px;
            border-radius: 0;
            object-fit: cover;
            align-self: center;
          }          

          .user-details-body {
            padding-top: 10px;
          }

          .user-details h5 {
            font-size: 100%;
            margin: 0;
            font-weight: bold;
          }

          .user-details p {
            margin: 0;
          }

          .platform-details {
            padding-bottom: 20px;
          }                 

          .platform-details p {
            margin: 0;
          }

          .settings {
            height: 100%;
            display: flex;
            flex-direction: column; 
            text-align: right;
          }

          .settings nav {
            margin-top: auto;
            align-self: flex-start;
            text-align: left;
          }

          @media (min-width: 992px) { 
            .bg-overlay {
              height: 320px;
            }

            .platform-details {
              padding: 0;
            }            

            .settings nav {
              align-self: flex-end;
              text-align: right;
            }
          }              

        `}</style>
      </div>
    );
  }
}
export default DashboardHeader;
