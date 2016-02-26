Willow UI [![Build Status](https://travis-ci.org/NitorCreations/willow-ui.svg)](https://travis-ci.org/NitorCreations/willow-ui)
=========

Client for Willow cloud management and monitoring.

# Get started

Stuff to do can be found here https://waffle.io/NitorCreations/willow-ui

Prerequirements

* [Node.js](https://nodejs.org/)

Add you public ssh key (e.g. ~/.ssh/id_rsa.pub) to willow-resources/authorized_keys

Install dependencies
```
$ npm install
```

Start Willow server

```
$ sh backend-dev-server/start-willow.sh
```

Check that willow server works:
* Point your browser to http://localhost:5120 => you'll get the old version of Willow's user interface.

Open development environment
```
$ npm run start
```

Point your browser to willow-ui at http://localhost:3000/ui => you'll get the new version of Willow's user interface.

In normally you should use user interface via http://localhost:5120/ui. That address proxies traffic to http://localhost:3000/ui.

## Authorization

Willow development server in `backend-dev-server/` has account/password `admin/admin`.

# Tools

[Babel](https://babeljs.io/)

[Sass](http://sass-lang.com/)

# Tech

[Redux](http://redux.js.org/)

[Material Design Lite](http://www.getmdl.io/)

