import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import { withRouter } from 'next/router'

const checkForCode = url => {
    console.log(url.substring(0, 6))
    if (url.substring(0, 6) === '?code=') {
      console.log(url.substring(6, url.length-2));
    }
}

const CatchAll = props => {
  const { router } = props;
  const path = props.router.asPath;
  let payload = {
    client_id: '573012866846964',
    client_secret: process.env.APP_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: 'https://ig-connect.now.sh/auth',
    code: 'code'
  };


  return (
    <div>
      <Head>
        <title> Error </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="body">
        <h1> Error Page </h1>
      </div>

      <style jsx>{`

      `}</style>
    </div>
  );
}

export default withRouter(CatchAll);
