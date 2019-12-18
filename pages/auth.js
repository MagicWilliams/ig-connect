import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import { withRouter } from 'next/router';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';

async function postData(url = '', data = {}) {
  console.log(data);
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}


const getUrlVars = url => {
    const vars = {};
    const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


const Auth = props => {
  const { router } = props;
  const path = props.router.asPath;
  const fullCode = getUrlVars(path)['code'];
  if (fullCode) {
    const trimmedCode = fullCode.substring(0, fullCode.length-2);
    let payload = {
      client_id: '573012866846964',
      client_secret: process.env.APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: 'https://ig-connect.now.sh/auth',
      code: trimmedCode
    };
    postData('/api/auth', payload);
  }

    return (
      <div>
        <Head>
          <title> Connect to IG </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="body">
          <h1> auth </h1>
        </div>

        <style jsx>{`

        `}</style>
      </div>
  )
}

export default withRouter(Auth);
