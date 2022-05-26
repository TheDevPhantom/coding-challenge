<img src="./client/public/challenge-logo.png" width="200">

# **Coding Challenge**

This app uses [Express](https://expressjs.com/) authorization using [JSON Web Tokens](https://jwt.io/) and [Sequelize](https://sequelize.org/) (works with SQL Server, MySQL, PostgreSQL, SQLite etc.) as the database ORM. [React](https://reactjs.org/) as the frontend framework, [Tailwind](https://tailwindcss.com/) for styling and [Redux](https://redux.js.org/) for state management.

> Open `package.json` files for the full list of dependencies

It was created by me (Adriaan Botha) for a job interview project.  
If you have any questions feel free to contact me via email or through my social links:

<adriaan@solis-studios.com>  
[Linked in](https://www.linkedin.com/in/adriaan-botha-5b5014199/)  
[Dribbble](https://dribbble.com/janadriaanbotha)

---

## **Installation**

#### Clone this repo

```
git clone https://github.com/TheDevPhantom/coding-challenge.git
```

#### CD into server

```
cd server
```

#### Install dependencies

```
npm install
```

---

## **Usage**

### Create config

Create a file called `\config\development.env` and insert the following environment variables:

- **PORT** _(eg. 5000)_
- **DB_HOST** _(eg. 192.168.0.102)_
- **DB_SCHEMA** _(eg. testdb)_
- **DB_USERNAME** _(eg. root)_
- **DB_PASSWORD** _(eg. admin123 or delete this field)_
- **JWT_SECRET** _(eg. my-32-character-ultra-secure-and-ultra-long-secret)_
- **JWT_EXPIRE** _(eg. 7d/3h/365d)_

> for convenience I have included the .env file. I usually add it to .gitignore as it will always contain sensitive data  
> make sure to use an empty database or new schema as it will sync the models to the database on start

### And finally run the app

```
npm run dev
```

Open your preferred browser and head to `http://localhost:5000` (or to the port you set in the config file)

### Default admin login credentials

```
username: admin
password: test
```

---

## **Questions**

### How do I handle forgot passwords?

> I create 2 fields in the user table namely: `passwordResetToken` and `passwordResetTokenExpiry`  
> When the user clicks on forgot password they will enter the email and with that the backend creates a public token and sends the token to the user via email  
> It then hashes the token with our private key and saves it in the database  
> When the user clicks on the link containing the public key and resets their password  
> The server compares the token with the saved hashed token  
> If successful the password will be reset.

### How much hours did I log for this project?

> ~5 hours
