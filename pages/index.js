import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import { withRouter } from 'next/router'
import { Sizing, Colors } from '../style-vars';
import firebase from '../firebase';
import * as firebaseMod from 'firebase/app';
require('firebase/auth');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      verificationCode: '',
      verifyPhone: false,
    }
  }


  componentDidMount() {
    window.recaptchaVerifier = new firebaseMod.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      }
    });
  }

  render() {
    const login = () => {
      console.log(phoneNumber);
    }

    const onSignInSubmit = () => {
      const { phoneNumber } = this.state;
      const formattedNum = '+1'+phoneNumber;
      var appVerifier = window.recaptchaVerifier;
      let confirmPhone;
      const processPhone = () => this.setState({ verifyPhone: true });

      firebase.auth().signInWithPhoneNumber(formattedNum, appVerifier)
      .then(function (confirmationResult) {
        processPhone()
        // SMS sent. Prompt user to type the code from the message, then sign the
        window.confirmationResult = confirmationResult;
      }).catch(function (error) {
        console.log(error);
      });
    }

    const verify = () => {
      const { verificationCode } = this.state;
      confirmationResult.confirm(verificationCode).then(function (result) {
        const { uid, phoneNumber } = result.user;
        console.log(uid, phoneNumber);
        wondow.location.href = '/u/' + phoneNumber;
      }).catch(function (error) {
        console.log('User couldn\'t sign in (bad verification code?)');
      });
    }

    const { verifyPhone } = this.state;

    return (
      <div>
        <Head>
          <title> Connect to IG </title>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js"></script>
        </Head>
        <div className="landing">
          {! verifyPhone && (
            <>
              <h1> Welcome </h1>
              <p className='intro-1'> School University is a free online degree program that operates through Instagram. Students will receive 8 lessons per day with 8 corresponding tests as well as one pop quiz. Top students are eligible to win up to $100 cash each day. These scholarships are paid at the end of the day through Venmo. </p>
              <p className='intro-2'> To enroll we need to access your Instagram account. </p>
              <input placeholder='Enter phone number' className='input' onChange={(e) => this.setState({phoneNumber: e.target.value})}type='tel' />
              <button id='sign-in-button' className='login' onClick={onSignInSubmit}> Grant access </button>
              <p className='disclaimer'> * School University is not an accredited educational facility, yet ‾\_(ツ)_/‾ </p>
              <img src='/img/logo-horizontal.png' className='logo' alt='School University' />
            </>
          )}
          {verifyPhone && (
            <>
              <h1> Verify Your Phone Number </h1>
              <input placeholder='Enter verification code' className='verification' onChange={(e) => this.setState({verificationCode: e.target.value})} type='text' />
              <button id='sign-in-button' className='confirm' onClick={verify}> Verify phone </button>
            </>
          )}
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

          .input, .verification {
            width: 100%;
            border: 1px solid black;
            height: 30px;
            text-align: center;
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

          .login, .confirm {
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
    );
  }
}

export default withRouter(Home);
