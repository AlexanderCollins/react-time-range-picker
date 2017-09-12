import React from 'react/addons';
import ReactTimeRangePicker from '../lib/react-time-range-picker.js';

describe('ReactTimeRangePicker', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactTimeRangePicker/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-time-range-picker');
  });
});
