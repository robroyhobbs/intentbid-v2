import https from 'https';
https.get('https://raw.githubusercontent.com/robroyhobbs/intentwin/main/README.md', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data.substring(0, 4000)));
});
