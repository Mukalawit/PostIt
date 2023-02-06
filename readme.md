[![Build](https://github.com/Mukalawit/PostIt/actions/workflows/ci.yml/badge.svg)](https://github.com/Mukalawit/PostIt/actions/workflows/ci.yml)
[![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Mukalawit/8d1b04b119ebc02c8e5f975b0dd0aae8/raw/d1aa0161a3569df7bdb040d6ab226e85dcbcc5d0/PostIt__pull_12.json)](https://gist.githubusercontent.com/Mukalawit/8d1b04b119ebc02c8e5f975b0dd0aae8/raw/d1aa0161a3569df7bdb040d6ab226e85dcbcc5d0/PostIt__pull_12.json)

# PostIt APP
This is an application that allows friends and colleagues create groups for notifications

## Project description
The application allows people create accounts,create groups and add registered users to the groups, and then send messages out to these groups whenever they want

## Getting Started

1. Install postgres on your local machine

2. Run this command in your postgres database ``` CREATE DATABASE PostIt``` see ```dbSetup.sql``` for tools that can help with this

3. Clone this respository

```
git clone https://github.com/Mukalawit/PostIt.git
```

4. Install dependencies

```
cd server

npm install
```

5. To your .env file add ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET , in your terminal run
```
$node 
> require('crypto').randomBytes(64).toString('hex')
```
to generate a random string for each token secret , your .env file should look like this

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postit?schema=public"

ACCESS_TOKEN_SECRET="bb7f863dfc8b648f0c1fef9b2c245f2330d9d49535c878da6b83f79232348663e9db04254bb553891c308650dbb836bd083d813d1f5cbf0af4742659944aec9e"

REFRESH_TOKEN_SECRET="746da95529ff21d26a476eb02feb7919391967043d7a8c3315d0ae789f4019ecbd036959b60be1ef24fd681b2fbdb818d2c230bb2adf9198149ac3826b0db67e"
```
6. Build your database
```

npx prisma generate
```
7. Start your app server
```
npm run dev
```
8. Start client server
```
cd client

cd postit

npm start

```

## Note
Ensure that both the application server and the client server are also running see steps 7 & 8



## Testing 

```
npm run test
```