document.addEventListener('DOMContentLoaded', function () {
  const clientId = 'Ov23liqYqwv5Tdl411a3'; // 您的 GitHub 客户端 ID
  const redirectUri = 'https://XYFGOOSE.github.io/GOOSE/callback.html'; // 您的 GitHub Pages 回调 URL
  let accessToken = '';

  console.log('Document loaded, setting up event listeners');

  const githubLoginButton = document.getElementById('github-login');
  const recordForm = document.getElementById('record-form');
  const submitRecordButton = document.getElementById('submit-record');

  if (githubLoginButton) {
    githubLoginButton.addEventListener('click', () => {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
      console.log('Redirecting to GitHub auth URL:', authUrl);
      window.location.href = authUrl;
    });
  } else {
    console.error('GitHub login button not found');
  }

  function getAccessToken(code) {
    console.log('Getting access token with code:', code);
    return axios.post('https://github.com/login/oauth/access_token', {
      client_id: clientId,
      client_secret: '5e493dd7824e39aaa02758c449af895e2fbccf7d',
      code: code,
      redirect_uri: redirectUri
    }, {
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      console.log('Access token response:', response.data);
      return response.data.access_token;
    }).catch(error => {
      console.error('Error getting access token:', error);
    });
  }

  function createIssue(title, body) {
    console.log('Creating issue with title:', title);
    return axios.post(`https://api.github.com/repos/XYFGOOSE/GOOSE/issues`, {
      title: title,
      body: body
    }, {
      headers: { 'Authorization': `token ${accessToken}` }
    }).then(response => {
      console.log('Issue created:', response.data);
    }).catch(error => {
      console.error('Error creating issue:', error);
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  console.log('Authorization code from URL:', code);

  if (code) {
    getAccessToken(code).then(token => {
      accessToken = token;
      if (recordForm) {
        recordForm.style.display = 'block';
      }
    }).catch(error => {
      console.error('Error processing login:', error);
    });
  } else {
    console.error('No authorization code found in URL');
  }

  if (submitRecordButton) {
    submitRecordButton.addEventListener('click', () => {
      const record = document.getElementById('record-input').value;
      createIssue('New Record', record).then(() => {
        console.log('Record saved');
      }).catch(error => {
        console.error('Error creating issue:', error);
      });
    });
  } else {
    console.error('Submit record button not found');
  }
});

  
