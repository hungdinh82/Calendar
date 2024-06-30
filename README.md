# Calendar
### Client & Server Setup:
1. Clone the source repository from Github.
```
git clone https://github.com/hungdinh82/Calendar
```

2. Navigate to server directory, install server dependencies, create env file (You will have to manually edit the env file to fit your credentials).
```
cd Calendar/server
npm install
call touch .env
echo import DB_USER=postgres >> .env
echo import DB_PASSWORD=PASSWORD >> .env
echo import DB_NAME=DB_NAME >> .env
echo import SECRET=SECRET_KEY >> .env
echo import SALT_LENGTH=10 >> .env
```

3. Navigate to client directory and install dependencies and create production build
```
cd ../client
npm install
npm run watch-client
```

4. Start server and view at http://localhost:4000 (port defined in /server/index.js)
```
cd ../server
npm i
npm run watch-server
```
