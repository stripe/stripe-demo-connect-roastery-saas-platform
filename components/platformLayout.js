import React from 'react';
import Head from '../components/head';
import NProgress from '../components/nprogress';
import getConfig from 'next/config';

class PlatformLayout extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <>
        <Head title={this.props.title || 'Home'} />
        <NProgress />

        <div className={'app-platform container-fluid'}>
          {this.props.children}
        </div>

        <style jsx>{`
          :global(body) {
            font-family: -apple-system, BlinkMacSystemFont, Roboto,
              Helvetica Neue, sans-serif;
            line-height: 1.75em !important;
            color: #484848 !important;
            font-size: 16px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: #f2f6f5;
          }

          :global(html) {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          :global(body) {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          :global(#__next) {
            height: 100%;
            margin: 0;
          }

          :global(.full-height) {
            height: 100%;
            margin: 0;
          }

          .app-platform {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          :global(.btn) {
            line-height: 100%;
            font-weight: 600;
            border-radius: 4px !important;
            padding: 10px 20px;

            border: 0;
            color: #000;
          }

          :global(.btn-primary) {
            background: #7cbfbb;
            box-shadow: 5px 5px 20px rgba(124, 191, 187, 0.25);
            color: #fff;
          }

          :global(.btn-primary:hover) {
            background: #63707e;
          }

          :global(button) {
            background-color: #0055ff;
            color: white;
            width: 100%;
            height: 44px;
            font-weight: 500;
            font-size: 17px;
            border-radius: 4px;
            border: 0;
          }

          :global(button:hover) {
            background-color: #0242c3;
            cursor: pointer;
          }

          :global(h1) {
            font-size: 28px;
            font-weight: 600;
            color: #202020;
            width: 70%;
            margin-bottom: 8px;
          }
        `}</style>
      </>
    );
  }
}

export default PlatformLayout;
