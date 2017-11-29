# rollup-plugin-uglify-bundle
Rollup plugin to generated distinct bundle for minified code

Can be used to remove sections of code.

### Why? And what it does?

_Why_: For example you may want to remove code from production builds, but keep it in development and test environments.

Usefull to remove code from production builds that are only needed in development and test environments, or to remove custom internationalized information. 
_What it does_: This plugin uses start and end comments to identify the code sections to strip out. For example:


```js
/*START.TESTS_ONLY*/
VueNotifications._private = {} //'_private' object would be exist only during the test time
VueNotifications._private.getVersion = getVersion // And I would be able to test 'getVersion' function (otherwise it won't be accesible because of the closure
/*END.TESTS_ONLY*/
```
(example from [vue-notifications](https://github.com/se-panfilov/vue-notifications) library)

or a bit simpler:

```js
/* test-code */
removeMeInProduction();
/* end-test-code */

doNotRemoveMe();
```

## Getting Started
First, install `rollup-plugin-strip-code` as a development dependency:

```shell
npm i rollup-plugin-strip-code --save-dev
#or
yarn add rollup-plugin-strip-code --dev
```

## Example config

Add to your `rollup.config.js`:

```js
export default [
  {
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      format: 'umd'
    },
    name: pluginName
  },
  {
    input: 'src/main.js',
    external: external,
    output: [
      {file: pkg.main, format: 'umd', name: pluginName}
    ],
    watch: {
      exclude: ['node_modules/**']
    },
    sourcemap: true,
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      stripCode({
        start_comment: 'START.TESTS_ONLY',
        end_comment: 'END.TESTS_ONLY'
      })
    ]
  }
];
```

### Options

#### options.start_comment
Type: `String`
Default value: `start_comment`

The text inside the opening comment used to identify code to strip.

#### options.end_comment
Type: `String`
Default value: `end_comment`

The text inside the closing comment used to identify code to strip.

#### options.pattern
Type: `RegExp`
Default value: (a generated RegExp matching the start and end comments)

If the default start and end comment matching doesn't work for you needs, you can supply your own RegExp to match against. If the `pattern` option is specified, the `start_comment` and `end_comment` options are ignored.

## Tests

```shell
npm test
```

## Same plugins for another tools

 - Grunt [grunt-strip-code](https://github.com/nuzzio/grunt-strip-code)
 - Gulp [gulp-strip-code](https://github.com/massick/gulp-strip-code)

## Contributing
Feel free and go ahead.

## License

MIT License

Copyright (c) 2017 Sergei Panfilov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
