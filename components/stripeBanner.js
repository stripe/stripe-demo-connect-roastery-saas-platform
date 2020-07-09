export default function StripeBanner(props) {
  return (
    <div className="annotation">
      <p>
        <img src="/stripe.svg" width="60" />
        Roastery is a{' '}
        <a className="stripe" href="https://stripe.com">
          Stripe
        </a>{' '}
        demo that uses{' '}
        <a href="https://stripe.com/connect" target="_blank">
          Connect
        </a>{' '}
        to power a SaaS platform for coffee roasters.{' '}
        <a
          className="github arrow"
          href="https://github.com/stripe/stripe-demo-connect-roastery-saas-platform"
          target="_blank"
        >
          View on GitHub
        </a>
      </p>

      <style jsx>
        {`
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
            color: #a96851;
          }

          @media (min-width: 820px) {
            .annotation {
              max-width: 800px;
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
        `}
      </style>
    </div>
  );
}
