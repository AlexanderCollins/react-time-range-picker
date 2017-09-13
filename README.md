# react-time-range-picker
A simple HTML5 canvas time range picker in React.

### Demo
![alt text](https://media.giphy.com/media/3o7aCPGsCo3BMdVcNG/giphy.gif)

### Installation
`npm i react-time-range-picker`

### Usage
`import TimeRangePicker from 'react-time-range-picker';`
`<TimeRangePicker hourmarkers hourlines/>`

### Example
```import TimeRangePicker from 'react-time-range-picker';

import React, { Component } from 'react';
import TimeRangePicker from 'react-time-range-picker';

export default class App extends Component {

  pickerupdate = (start_time, end_time) => {
    // start and end time in 24hour time
    console.log(`start time: ${start_time}, end time: ${end_time}`)
  }

  render() {
    return (
      <div>
	      <TimeRangePicker hourmarkers hourlines timeupdate={this.pickerupdate}/>
      </div>
    );
  }
}
```

### Props

  **hourmarkers** - enables vertically numbered list of 12hour format markers.
  
  **hourlines** - enables horizontal hour lines.
  
  **rangecolor** - css color string to set range color.
  
  **markercolor** - css color string to set vertical markers
  
  **markerfont** - defaults to css string "15px Arial".
  
  **timeupdate** - function which is called on mouseup with start_time and end_time respectively in 12 hour time format.
  

