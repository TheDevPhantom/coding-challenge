import express, { json } from 'express';

import db from './config/db.js';
import { config } from 'dotenv';

import auth from './routes/auth.js';
import users from './routes/users.js';

import errorHandler from './middleware/error.js';
import User from './models/User.js';
import path from 'path';

const __dirname = path.resolve();

// Load environment variables base on the environment set by npm
config({ path: `./config/${process.env.NODE_ENV}.env` });

// Authenticate the database
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error: ' + err));

// Create a new server instance on start
const app = express();

// ========================================
//                MIDDLEWARE
// ========================================
app.use(json());

// ========================================
//                  ROUTES
// ========================================
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

// Catches all uncaught errors
app.use(errorHandler);

// Tell express to use this folder for static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

// Sync the database and if successful start the server
// else log error to the console
db.sync({ force: false })
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        firstname: 'Admin',
        lastname: 'Admin',
        username: 'admin',
        email: 'admin@test.co.za',
        password: 'test',
        role: 'admin',
      });
    }

    return user;
  })
  .then(() => {
    const port = process.env.port || 5000;

    app.listen(port, () =>
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${port}`
      )
    );
  })
  .catch((err) => console.log(err));

export default app;
