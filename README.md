# react time range picker

Get the AMD module located at `react-time-range-picker.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactTimeRangePicker': 'react-time-range-picker'
  }
});

require(['react', 'ReactTimeRangePicker'], function(React, ReactTimeRangePicker) {

  React.render(React.createElement(ReactTimeRangePicker), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
