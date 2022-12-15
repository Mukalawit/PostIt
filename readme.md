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
to generate a random string for each token

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