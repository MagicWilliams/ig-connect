import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import { withRouter } from 'next/router'

const login = () => {
  console.log('Redirecting to Instagram...')
  window.location.href = 'https://api.instagram.com/oauth/authorize?app_id=573012866846964&redirect_uri=https://ig-connect.now.sh/auth&scope=user_profile&response_type=code';
}

const Home = props => {
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
