import axios from 'axios';

const getUrlVars = url => {
    const vars = {};
    const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

export default (req, res) => {
  let code = getUrlVars(req.url)["code"];
  let payload = {
    client_id: '573012866846964',
    client_secret: process.env.APP_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: 'https://4f1a2d73.ngrok.io/auth',
    code: code
  };

  axios.post(`https://api.instagram.com/oauth/access_token`, payload).then(res => {
    console.log(res);
  })
  .catch(function (error) {
    console.log('error');
  });
  console.log(code, payload);
}
