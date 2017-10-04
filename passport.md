# Passport authentication

## Middleware

Interrupts the request/response cycle

line 37 of server config:
```javascript
app.use('/auth', auth);
```

## Auth Routing
auth/auth.js:
Creates a router to handle any requests asking for anything in /auth
```javascript
router.route('/google/callback')
.get(passport.authenticate('google', {
  successRedirect: '/index.html',
  failure: '/error/'
}));

router.route('/google')
.get(passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
}));
```

### Cookies
```javascript
app.use(cookieParser());
```

cookie parser may or may nnot be necessary now

Cookie-parser will parse the Cookie header and handle cookie separation and encoding, can also decrypt it.
The secret is used to verify the cookie originated from your server

A signed token is a good method for anything where you want to issue a token and then, when it is returned, be able to verify that you issued the token, without having to store any data on the server side. This is good for features like:

time-limited-account-login;
password-resetting;
anti-XSRF forms;
time-limited-form-submission (anti-spam).
It's not in itself a replacement for a session cookie, but if it can eliminate the need for any session storage at all that's probably a good thing, even if the performance difference isn't going to be huge.

### Sessions
Can set cookie properties with express-session
[Github - Express-session]()https://github.com/expressjs/session)

```javascript

app.use(session({
  secret: 'quiz me not',
  resave: true,
  saveUninitialized: true
}));
```


EXAMPLE using info you attached to the session:
```javascript
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
```

How to use Serialize user and Deserialize user:
[A helpful explanation](https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize)

When we receive the

`req.session.passport.user = { // our serialised user object // }.`
The result is also attached to the request as req.user.

## Later requests:

On subsequent request, the following occurs:

1. Express loads the session data and attaches it to the req. `req.session`
1. Passport uses the user stored in the session and stores the serialised user in the session, the serialised user object can be found at `req.session.passport.user`.
1. The general passport middleware we setup (passport.initialize) is invoked on the request, it finds the passport.user attached to the session. 
1. If is doesn't (user is not yet authenticated) it creates it like req.passport.user = {}.
1. Next, passport.session is invoked. This middleware is a Passport Strategy invoked on every request. 
1. If it finds a serialised user object in the session, it will consider this request authenticated.
1. The passport.session middleware calls passport.deserializeUser we've setup. 
Attaching the loaded user object to the request as req.user.


### Login/Logout the user
```javascript
req.login(user, function(err) {
  if (err) { return next(err); }
  return res.redirect('/users/' + req.user.username);
});
```
```javascript
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
```



### Requiring a user is logged in

```javascript
//example custom middleware
function authRequired (req, res, next) {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/auth/login');
  }
  next();
}
```

### Using the req. user as the author of content
```javascript
if (req.user) {
      data.createdBy = req.user.displayName;
      data.createdById = req.user.id;
    } else {
      data.createdBy = 'Anonymous';
    }

```