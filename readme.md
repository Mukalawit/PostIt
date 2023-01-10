[![Build](https://github.com/Mukalawit/PostIt/actions/workflows/ci.yml/badge.svg)](https://github.com/Mukalawit/PostIt/actions/workflows/ci.yml)
[![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Mukalawit/8d1b04b119ebc02c8e5f975b0dd0aae8/raw/d1aa0161a3569df7bdb040d6ab226e85dcbcc5d0/PostIt__pull_12.json)](https://gist.githubusercontent.com/Mukalawit/8d1b04b119ebc02c8e5f975b0dd0aae8/raw/d1aa0161a3569df7bdb040d6ab226e85dcbcc5d0/PostIt__pull_12.json)

# PostIt APP
This is an application that allows friends and colleagues create groups for notifications

## Project description
The application allows people create accounts,create groups and add registered users to the groups, and then send messages out to these groups whenever they want

## Getting Started

1.Install postgres on your local machine

2.Run the `dbSetup.sql` script to setup the database on your local machine

3.Clone this respository

```
git clone https://github.com/Mukalawit/PostIt.git
```

4. Install dependencies

```
npm install
```

5. Start server
```
npm run dev
```
6. To your .env file add ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET , in your terminal run
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


7. To sign up a user, use POSTMAN and go to this end point
```
localhost:3000/api/user/signup

```
8. POST a json object in the form
```
{
    "username:"username",
    "password":"password",
    "email":"email"

}

```

9. To sign up a user, use POSTMAN and go to this end point
```
localhost:3000/api/user/signin

```
10. POST a json object in the form
```
{
    "username:"username",
    "password":"password"

}
## Testing 

```
npm run test
```