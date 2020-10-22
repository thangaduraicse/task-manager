# personal_task_manager
This is a sample React+Redux application

## Setup webpack to bundle SPA
1. npm install webpack --save-dev
2. npm install webpack-dev-server --save-dev

https://tailwindcss.com/

Browser sources about webpack//

What is Yarn/NPM difference?
How to raise and resolve git issues?
What is license in Github?
How to setup ssh in Github?

Presets can be defined in two ways.
1. create .babelrc and add the configuration - best way
2. Update it in package.json

Why webpack bundle.js dependent on contentBase?


# personal_task_manager
This is a sample React+Redux application

## Setup webpack to bundle SPA
1. npm install webpack --save-dev
2. npm install webpack-dev-server --save-dev

What is Yarn/NPM difference?
How to raise and resolve git issues?
What is license in Github?
How to setup ssh in Github?

Presets can be defined in two ways.
1. create .babelrc and add the configuration - best way
2. Update it in package.json

Why webpack bundle.js dependent on contentBase?


Prod
Browser security - Browser(https://client.com/bundle.js, https://client.com/api/prescriber) => (https://client.com)Server(ngnix 1. content (index.html, bundle.js), 2. proxy('https://client.com/api/prescriber' --> https://ms.server.com/v1/prescriber)) => MS ('/v1/prescriber' => 'https://business.com/prescriber') => business


Mod-proxy referer: https://ms.server.com


Dev
Browser(https://localhost:3000/bundle.js, http://localhost:3000/api/prescriber) => (http://localhost:3000)Webpack dev server(express 1. content (index.html, bundle.js), 2. proxy('/api/prescriber' --> https://ms.com/v1/prescriber)) => MS ('/v1/prescriber' => 'https://business.com/prescriber') => business


How to achieve flex wrap in existing design?
Explain this in more declaritive way to venkat

&:after, &:before {
    
}

What is bind do?
let take an example "this.handleClick = this.handleClick.bind(this);". Here, 'this' inside the function is refer to Component Instance. Its simply binding 'some object' (eg; this - Component Instance) to the function. you can bind any object like that.

Why bind 'this' required?
'this' depends how it is called, not how/where it is created. Alternatively, 'this' is always pointed to object onto which method invoked. The reason behind bind is, we call that method in child component something like ```this.props.handleClick();``` where the props is immutable one, so, this will return undefined.

