rm index.html -ErrorAction Ignore

choco install -y nodejs
refreshenv

npm install
node .\index.js