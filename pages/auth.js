import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav';
import { withRouter } from 'next/router';
import axios from 'axios';
import FormData from 'form-data';
import fetch from 'isomorphic-unfetch';

const getUrlVars = url => {
  const vars = {};
  const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}


class Auth extends React.Component {
  async componentDidMount() {
    const { router } = this.props;
    const path = this.props.router.asPath;
    const fullCode = getUrlVars(path)['code'];
    if (fullCode) {
      const trimmedCode = fullCode.substring(0, fullCode.length-2);
      var data = new FormData();
        data.append('app_id', process.env.APP_ID)
        data.append('app_secret', process.env.APP_SECRET)
        data.append('redirect_uri','https://ig-connect.now.sh/auth')
        data.append('grant_type','authorization_code')
        data.append('code', trimmedCode)
      await fetch('https://api.instagram.com/oauth/access_token', {
        body: data,
        method: "POST"
      }).then(async res => {
        const myJson = await res.json();
        const url = 'https://graph.instagram.com/' + myJson.user_id + '?fields=id,username&access_token=' + myJson.access_token;
        await fetch(url, {
          method: 'GET'
        }).then(async res => {
          console.log(res);
          await res.json().then((res) => {
            window.location.href = '/u/' + res.username;
          });
        });
      });
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title> Connect to IG </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="body">
          <h1> Logging you in... </h1>
        </div>

        <style jsx>{`

        `}</style>
      </div>
    )
  }
}



export default withRouter(Auth);
