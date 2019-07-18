
'use strict';

// Modules
var path = require('path');

var config = {

  // Your site title (format: page_title - site_title)
  site_title: 'Sparkfabrik playbook',

  // The base URL of your site (can use %base_url% in Markdown files)
  base_url: '',

  // Used for the "Get in touch" page footer link
  support_email: '',

  // Footer Text / Copyright
  copyright: 'Copyright &copy; ' + new Date().getFullYear() + ' - <a href="http://raneto.com">Powered by Raneto</a>',

  // Excerpt length (used in search)
  excerpt_length: 400,

  // The meta value by which to sort pages (value should be an integer)
  // If this option is blank pages will be sorted alphabetically
  page_sort_meta: 'sort',

  // Should categories be sorted numerically (true) or alphabetically (false)
  // If true category folders need to contain a "sort" file with an integer value
  category_sort: true,

  // Controls behavior of home page if meta ShowOnHome is not present. If set to true
  // all categories or files that do not specify ShowOnHome meta property will be shown
  show_on_home_default: true,

  // Which Theme to Use?
  theme_dir  : path.join(__dirname, 'themes'),
  theme_name : 'spark',

  // Specify the path of your content folder where all your '.md' files are located
  // Fix: Needs trailing slash for now!
  // Fix: Cannot be an absolute path
  content_dir : path.join(__dirname, 'content'),

  // Where is the public directory or document root?
  public_dir  : path.join(__dirname, 'assets'),

  // The base URL of your images folder,
  // Relative to config.public_dir
  // (can use %image_url% in Markdown files)
  image_url: '/images',

  // Add your analytics tracking code (including script tags)
  analytics: '',

  // Set to true to enable the web editor
  allow_editing : false,

  // Set to true to enable HTTP Basic Authentication
  authentication : false,

  // If editing is enabled, set this to true to only authenticate for editing, not for viewing
  authentication_for_edit: true,

  // If authentication is enabled, set this to true to enable authentication for reading too
  authentication_for_read: false,

  // Google OAuth
  googleoauth: false,
  oauth2 : {
    client_id: 'GOOGLE_CLIENT_ID',
    client_secret: 'GOOGLE_CLIENT_SECRET',
    callback: 'http://localhost:3000/auth/google/callback',
    hostedDomain: 'google.com'
  },
  secret: 'someCoolSecretRightHere',

  credentials    : [
    {
      username : 'admin',
      password : 'password'
    },
    {
      username : 'admin2',
      password : 'password'
    }
  ],

  locale: 'en',

  // Support search with extra languages
  searchExtraLanguages: ['it'],

  // Sets the format for datetime's
  datetime_format: 'D MMM YYYY',

  // Set to true to render suitable layout for RTL languages
  rtl_layout: false,

  // Edit Home Page title, description, etc.
  home_meta : {
    title       : 'SparkFabrik playbook',
    description : 'All you - hopefully - need to know to work in and with SparkFabrik.'
  },

  // variables: [
  //   {
  //     name: 'test_variable',
  //     content: 'test variable'
  //   },
  //   {
  //     name: 'test_variable_2',
  //     content: 'test variable 2'
  //   }
  // ]

  table_of_contents: true

};

// Exports
module.exports = config;