Willow UI
=========

Client for Willow cloud management and monitoring.

# Get started


Prerequirements

* [Node.js](https://nodejs.org/)

Add you public ssh key (e.g. ~/.ssh/id_rsa.pub) to willow-resources/authorized_keys

Install dependencies
```
$ npm install
```

Start Willow server

```
$ sh start-willow.sh
```

Check that willow server works:
* Point your browser to http://localhost:5120 => you'll get the old version of Willow's user interface.

Open development environment
```
$ npm run start
```

Point your browser to willow-ui at http://localhost:3000 => you'll get the new version of Willow's user interface.

# Tools

[Babel](https://babeljs.io/)

[Sass](http://sass-lang.com/)

# Tech

[Redux](http://redux.js.org/)

[Material Design Lite](http://www.getmdl.io/)

