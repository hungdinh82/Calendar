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
echo import DATABASE_HOST=127.0.0.1 >> .env
echo import DATABASE_PORT=3306 >> .env
echo import DATABASE_USER=root >> .env
echo import DATABASE_PASS=**** >> .env
echo import DATABASE_NAME=main >> .env
```

3. Navigate to client directory and install dependencies and create production build
```
cd ../client
npm i
npm run watch-client
```

4. Start server and view at http://localhost:4000 (port defined in /server/index.js)
```
cd ../server
npm i
npm run watch-server
```
