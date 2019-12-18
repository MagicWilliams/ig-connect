import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

const checkForCode = url => {
    console.log(url.substring(0, 6))
    if (url.substring(0, 6) === '?code=') {
      console.log(url.substring(6, url.length-2));
    }
}

const UserPage = props => {
  const { router } = props;
  const username = props.router.query.user;
  return (
    <div>
      <Head>
        <title> Welcome to School University </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="body">
        <h1> Hello, {username} </h1>
      </div>

      <style jsx>{`

      `}</style>
    </div>
  );
}

export default withRouter(UserPage);
