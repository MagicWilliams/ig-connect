import axios from 'axios';
import fetch from 'isomorphic-unfetch';

const getUrlVars = url => {
    const vars = {};
    const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


export default async (req, res) => {
  if (req.method === 'POST') {
    let code = getUrlVars(req.url)["code"];
    let payload = {
      client_id: '573012866846964',
      client_secret: process.env.APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: 'https://ig-connect.now.sh/auth',
      code: code
    };

    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'post',
      body: JSON.stringify(payload),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });
    const myJson = await response.json();
    console.log(JSON.stringify(myJson));
    console.log('triggered!')
  }
}
