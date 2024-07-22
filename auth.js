document.addEventListener('DOMContentLoaded', function () {
  const clientId = 'Ov23liqYqwv5Tdl411a3'; // 您的 GitHub 客户端 ID
  const redirectUri = 'https://XYFGOOSE.github.io/GOOSE/callback.html'; // 您的 GitHub Pages 回调 URL
  let accessToken = '';

  function getAccessToken(code) {
    return axios.post('https://github.com/login/oauth/access_token', {
      client_id: clientId, // 您的 GitHub 客户端 ID
      client_secret: '5e493dd7824e39aaa02758c449af895e2fbccf7d', // 您的 GitHub 客户端密钥
      code: code,
      redirect_uri: redirectUri
    }, {
      headers: { 'Accept': 'application/json' }
    }).then(response => response.data.access_token);
  }

  function createIssue(title, body) {
    return axios.post(`https://api.github.com/repos/XYFGOOSE/GOOSE/issues`, {
      title: title,
      body: body
    }, {
      headers: { 'Authorization': `token ${accessToken}` }
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    getAccessToken(code).then(token => {
      accessToken = token;
      document.getElementById('record-form').style.display = 'block';
    });
  }
});

  
