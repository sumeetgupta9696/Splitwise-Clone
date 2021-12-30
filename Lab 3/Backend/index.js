const app = require('./app');

// const ping = require('./routes/ping');
// const login = require('./routes/login');
// const signup = require('./routes/signup');
// const profile = require('./routes/profile');
// const images = require('./routes/images');
// const groups = require('./routes/groups');
// const bills = require('./routes/bills');

// app.use('/api/ping', ping);
// app.use('/api/login', login);
// app.use('/api/signup', signup);
// app.use('/api/profile', profile);
// app.use('/api/images', images);
// app.use('/api/groups', groups);
// app.use('/api/bills', bills);

require('./config/mongoose');


const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
