import {Component} from 'react';
import API from '../helpers/api';
import logger from '../helpers/logger';
import {redirect} from '../utils/redirect';
import getConfig from 'next/config';

class DashboardPlatformSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.platform,
    };

    this.isFormDisabled = getConfig().publicRuntimeConfig.isTestMode;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      let req = await API.makeRequest(
        'put',
        `/api/platforms/${this.state.platformId}`,
        this.state,
      );
      return redirect('/dashboard/settings');
    } catch (err) {
      logger.log('Settings save failed.', err);
    }
  }

  render() {
    return (
      <>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Platform name</label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                placeholder=""
                value={this.state.name}
                disabled={this.isFormDisabled}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Platform url</label>
              <input
                className="form-control"
                type="text"
                disabled
                value={'http://roastey.com/p/' + this.state.slug}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Address</label>
              <input
                className="form-control"
                type="text"
                id="address"
                name="address"
                placeholder=""
                value={this.state.address}
                disabled={this.isFormDisabled}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">City</label>
              <input
                className="form-control"
                type="text"
                id="city"
                name="city"
                placeholder=""
                value={this.state.city}
                disabled={this.isFormDisabled}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Zip</label>
              <input
                className="form-control"
                type="text"
                id="zip"
                name="zip"
                placeholder=""
                value={this.state.zip}
                disabled={this.isFormDisabled}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">State</label>
              <input
                className="form-control"
                type="text"
                id="state"
                name="state"
                placeholder=""
                value={this.state.state}
                disabled={this.isFormDisabled}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Platform description</label>
              <textarea
                className="form-control"
                type="text"
                id="description"
                name="description"
                placeholder=""
                value={this.state.description}
                disabled={this.isFormDisabled}
                onChange={this.handleChange}
              />
            </div>

            <button type="submit" className="btn-submit btn btn-primary">
              Update settings{' '}
              {this.isFormDisabled ? '(disabled in test mode)' : ''}
            </button>

            <p className={`error ${this.state.error && 'show'}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx>{`
          .form {
            margin: 0;
          }

          label {
            font-weight: 600;
          }

          input {
            padding-left: 12px;
          }

          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }
          .error.show {
            display: block;
          }

          .btn-submit {
            margin-top: 20px;
          }
        `}</style>
      </>
    );
  }
}

export default DashboardPlatformSettings;
