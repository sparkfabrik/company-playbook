#!/usr/bin/env node

// Here is where we load Raneto.
// When you are in your own project repository,
// Raneto should be installed via NPM and loaded as:
import raneto from 'raneto';

// Then, we load our configuration file
// This can be done inline, with a JSON file,
// or with a Node.js module as we do below.
import config from './config.js';

// Finally, we initialize Raneto
// with our configuration object
const app = raneto(config);

// We always serve behind a single reverse proxy (Cloud Run in production, the
// local development proxy on workstations), which appends the visitor address
// to X-Forwarded-For. Trusting that one hop lets Raneto's rate limiter count
// requests per visitor instead of lumping every visitor into one bucket.
app.set('trust proxy', 1);

// Load the HTTP Server
const server = app.listen(app.get('port'), () => {
  console.log('Express HTTP server listening on port ' + server.address().port);
});
