# ReactJS boilerplate with Typescript & SCSS 

* Webpack 4
* HMR
* ReactJS
* Typescript 
* SCSS 
* babel
* PostCSS autoprefixer
* async/await
* tslint

## Environment variables 

Boilerplate uses [dotenv](https://www.npmjs.com/package/dotenv) for the environment variables.

Primarily, you should copy app.env.example file and rename it: 

```console
$ cp app.env.example app.env
```

## SCSS variables

By default ```src/variables.scss``` file will be imported into every SCSS-module by means of [sass-resources-loader](https://github.com/shakacode/sass-resources-loader).

You can change the variables file location in the app.env file:

```
SCSS_VARIABLES_PATH = ./src/variables.scss
```

## Run
Clone this repo and install the modules:
```
$ npm install
```

Run dev server with HMR:

```console
$ npm run dev
```

Production build:

```console
$ npm run build
```




