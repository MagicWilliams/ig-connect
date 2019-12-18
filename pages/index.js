import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import { withRouter } from 'next/router'

const login = () => {
  console.log('Redirecting to Instagram...')
  window.location.href = 'https://api.instagram.com/oauth/authorize?app_id=573012866846964&redirect_uri=https%3A%2F%2Fig-connect.now.sh/auth&scope=user_profile&response_type=code';
}

const getUrlVars = url => {
    const vars = {};
    const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


const Home = props => {
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

    console.log(payload);
  }
  return (
    <div>
      <Head>
        <title> Connect to IG </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="body">
        <button onClick={login}> Login </button>
      </div>

      <style jsx>{`

      `}</style>
    </div>
)}

export default withRouter(Home);
