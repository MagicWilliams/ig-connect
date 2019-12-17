import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';

const login = () => {
  console.log('Redirecting to Instagram...')
  window.location.href = 'https://api.instagram.com/oauth/authorize?app_id=573012866846964&redirect_uri=https%3A%2F%2Fschoooool.com%2Fauth&scope=user_profile&response_type=code';
}

const Home = () => (
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
)

export default Home
