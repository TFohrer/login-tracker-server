# login-tracker-server

Node.js-Server for storing data coming from login-tracker Firefox extension.
Used technologies/frameworks:

* Node.js
* Express (+ body-parser)
* MongoDB

Server is currently hosted on [openshift](https://www.openshift.com/)

# Install

Install npm:

```
    $ npm install
```


Install mongodb e.g. with brew:

```
    $ brew install mongodb
```


# Start
start mongodb

```
    $ mongod
```

 
start node app

```
    $ node app.js
```


# Deploy to openshift

- create remote branch
- commit and push to branch via 
```
    git push <remote branch name> origin
```
