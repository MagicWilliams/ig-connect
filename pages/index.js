import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import { withRouter } from 'next/router'
import { Sizing, Colors } from '../style-vars';

const login = () => {
  console.log('Redirecting to Instagram...')
  window.location.href = 'https://api.instagram.com/oauth/authorize?app_id=573012866846964&redirect_uri=https://ig-connect.now.sh/auth&scope=user_profile&response_type=code';
}

function Home(props) {
  return (
    <div>
      <Head>
        <title> Connect to IG </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="landing">
        <h1> Welcome </h1>
        <p className='intro-1'> School University is a free online degree program that operates through Instagram. Students will receive 8 lessons per day with 8 corresponding tests as well as one pop quiz. Top students are eligible to win up to $100 cash each day. These scholarships are paid at the end of the day through Venmo. </p>
        <p className='intro-2'> To enroll we need to access your Instagram account. </p>
        <button className='login' onClick={login}> Grant access </button>
        <p className='disclaimer'> * School University is not an accredited educational facility, yet ‾\_(ツ)_/‾ </p>
        <img src='/img/logo-horizontal.png' className='logo' alt='School University' />
      </div>

      <style jsx>{`
        .landing {
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
          min-height: 100vh;
          padding-top: ${Sizing.lg};
        }

        .landing h1 {
          font-family: "Windsor";
          font-size: 4rem;
          margin: ${Sizing.lg};
        }

        .intro-1, .intro-2 {
          margin: ${Sizing.xs} 0px;
        }

        .intro-2 {
          margin-bottom: ${Sizing.xl};
        }

        .login {
          width: 100%;
          padding: ${Sizing.md};
          background: ${Colors.blue};
          color: white;
          font-size: 16px;
          margin: ${Sizing.lg} 0px;
          border: none;
          outline: none;
        }

        .disclaimer {
          font-size: 8px;
          margin-top: ${Sizing.md};
        }


        .logo {
          width: 100%;
          margin-top: ${Sizing.lg};
        }

      `}</style>
    </div>
)}

export default withRouter(Home);
