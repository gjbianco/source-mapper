# source-mapper

Uses the `source-map` library from Mozilla to do a lookup for source location in the original source, based on a sourcemap.

This is useful when trying to use a stacktrace coming from a minified/built JS file.

## Usage

Configuration is based on a combination of defaults as well as any environment variabls set. You can easily define the variables and call this script in the same line (see below for an example).

While all of the environment variable options are technically optional, you will likely want to at least set the location, app name, and column.

You will need to make sure your local source builds are actually building sourcemaps. If you are using the ng-cli for Angular, you can do this simply with:

`ng build --prod --sourceMap=true`

This will build the app using the production options (e.g. minify, do tree shaking, don't generate sourcemaps, etc.), but we explicitly tell it to still generate the sourcemaps we need.

## Environment Variable Options

`SOURCE_LOCATION`: the base path to the project's source

`SOURCE_APP`: the name of the application. this script assumes the sourcemaps are in `<PROJECT_LOCATION>/dist/<APP_NAME>`.

`SOURCE_FILENAME`: the base name of the file. other examples: main-es5, polyfills-es2015.

`SOURCE_HASH`: hash part of the built minified file. you NEED to make sure you're on the same commit and that the hashes match in the `/path/to/my/app/dist` folder.

`SOURCE_LINE`: line from minified file -- likely won't change from 1.

`SOURCE_COLUMN`: column from the minified file.

## Usage Example

```
SOURCE_LOCATION='/path/to/my/app' SOURCE_APP='my-app-name' SOURCE_COLUMN='1234' npm start
```
