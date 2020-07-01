# Roastery demo SaaS platform using Stripe Connect

This sample shows how to build a coffee roastery themed SaaS platform using [Stripe Checkout](http://stripe.com/checkout) and [Stripe Connect](https://stripe.com/connect), where coffee roasteries can signup to get their website and wholesale shop with just a few clicks. The Roastery platform takes an application fee for every transaction happening on the platform.

Platform owners re on-boarded using [Stripe Connect Standard](https://stripe.com/connect) where they connect their existing Stripe account. When the marketplace accepts funds via card payments, the funds are routed to the seller's Stripe accounts as a part of each marketplace transaction.

See a hosted version of the [https://roastery.stripe.dev](https://roastery.stripe.dev)

<img src="./demo.png" alt="Preview of recipe" align="center">

## Features

- Basic user authentication system.
- Stripe onboarding using Stripe Connect Standard.
- Payments via Stripe Checkout.
- Basic platform website for each platform.
- Custom platform dashboard.

## Architecture

The marketplace is implemented as as full-stack application powered by [Next.js](https://nextjs.org/) and contains a React front-end, and a Node.js REST API.

The app renders its React components as both the server and client-side using [isomorphic rendering](https://matwrites.com/universal-react-apps-start-with-next-js/).

![](https://matwrites.com/wp-content/uploads/2017/06/Isomorphic-web-apps.png)

### Technical features

- Authentication system using [JWT tokens](https://jwt.io/) with login and signup pages.
- Storage using [LowDB](https://github.com/typicode/lowdb) to provide a basic local JSON database.
- REST API scaffolding with authentication endpoints for resources like `listings`, `login`, `payouts`, `profile`, `signup`, `transactions`, and `users`.
- Card payments are accepted via [Payment Intents API](https://stripe.com/docs/payments/payment-intents) + [Stripe Elements](https://stripe.com/payments/elements) and is integrated via [`react-stripe-elements`](https://github.com/stripe/react-stripe-elements)

## Getting started

To run this sample locally all you need is checkout the repo and run the app.

You will need a Stripe account with its own set of [API keys](https://stripe.com/docs/development#api-keys), and enable a few features for your Stripe Account.

Don't worry, just follow the steps in this guide.

**1. Clone and configure the sample**

```
git clone git@github.com:stripe/stripe-demo-connect-roastery-saas-platform.git
```

**2. Configure Stripe**

The first thing you need to do is to Create a Connect platform. You do that by going to https://dashboard.stripe.com/test/connect/overview.

Once you have registered your Connect platform, you can now generate a Connect User Id. You need this together with your Stripe API keys.

**2. Get Stripe API keys and configure environment variables**

Go to the Stripe [developer dashboard](https://dashboard.stripe.com/apikeys) to find your API keys (developer settings), and your Connect User Id (Connect setttings).

Copy the .env.example file into a file named .env in the folder of the server you want to use. For example:

```
cp .env.example .env
```

Now copy your Stripe API keys and Connect User id into your `.env` file:

```
STRIPE_PUBLIC_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
STRIPE_CLIENT_ID=<replace-with-your-connect-client-id>
```

Save the `.env` file and you should be good.

### Using the sample app

1. Run `npm install`
1. Run `npm run dev`
1. You are now ready to use the app running in [http://localhost:3000](http://localhost:3000).
1. The marketplace should be available, and if you go to `/login` you should be able to login as both buyers and sellers using the demo buttons.
1. 🎉

## FAQ

Q: Why did you pick these frameworks?

A: We chose the most minimal framework to convey the key Stripe calls and concepts you need to understand. These demos are meant as an educational tool that helps you roadmap how to integrate Stripe within your own system independent of the framework.

Q: Can you show me how to build X?

A: We are always looking for new recipe ideas, please email dev-samples@stripe.com with your suggestion!

## Author(s)

[@auchenberg-stripe](https://twitter.com/auchenberg)
