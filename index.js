import React from 'react';

export default React.createClass({

  // Set up initial state
  getInitialState: function() {
    return {
      start_line: null,
      end_line: null,
      start_time: undefined,
      end_time: undefined,
    };
  },
  get_canvas_coordinates: function(evt){
    var x = evt.clientX - this.state.context.canvas.getBoundingClientRect().left,
        y = evt.clientY - this.state.context.canvas.getBoundingClientRect().top;
    return {x: x, y: y};
  },

  draw_grid: function(){
    var y_step = this.state.context.canvas.height / 24.0;
    var step = y_step;
    this.state.context.beginPath();
    this.state.context.lineWidth = 0.1;

    for(var i = 0; i < 24; i++){
      if(i%2 == 0){
        this.state.context.strokeStyle = 'rgba(0,0,0,0.2)';
      } else {
        this.state.context.strokeStyle = 'rgba(0,0,0,1.0)';
      }
      this.state.context.moveTo(0, step);
      this.state.context.lineTo(this.state.context.canvas.width, step);
      step = step + y_step
    }
    this.state.context.stroke();

    var step = y_step;
    this.state.context.fillStyle = 'blue';
    this.state.context.font="15px Arial";
    this.state.context.textAlign="start";
    for(var i = 1; i < 25; ++i){
      this.state.context.fillText(`${(i%12) == 0 ? 12 : (i%12)} ${(i/12) > 1 ? "pm" : "am"}`,10, step);
      step = step + y_step
    }
  },

  to_24_hour_format: function(raw_time){
    raw_time = parseInt(Math.round((Math.round(raw_time*2)/2)/50)*50);
    var end_of_raw_time = `${parseInt((parseInt(raw_time.toString().slice(-2))/100)*60)}`;

    if(end_of_raw_time.length == 1){
      end_of_raw_time = "0" + end_of_raw_time
    }
    var start_of_raw_time = `${raw_time}`.substring(0,(raw_time > 999 ? 2 : 1))
    if(start_of_raw_time.length == 1){
      start_of_raw_time = "0" + start_of_raw_time
    }
    raw_time = start_of_raw_time + ":" + end_of_raw_time
    if(raw_time === "24:00"){
      raw_time = "23:59"
    }
    return raw_time
  },

  generate_time_bounds: function(){
    var start = this.to_24_hour_format(((this.state.start_line / this.state.context.canvas.height) * 100.0) * 24);
    var end = this.to_24_hour_format(((this.state.end_line / this.state.context.canvas.height) * 100.0) * 24);

    this.setState({
      start_time: start,
      end_time: end,
    }, () => {
      this.props.dispatch(setTimePeriodSelectorBounds({start: this.state.start_time, end: this.state.end_time}))
    })
  },

  clear_canvas: function(){
    this.state.canvas.width = this.state.canvas.offsetWidth;
    this.state.canvas.height = this.state.canvas.offsetHeight;
    this.state.context.fillStyle='#FFFFFF';
    this.state.context.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    this.state.context.fillRect(0, 0, this.state.context.canvas.clientWidth, this.state.context.canvas.clientHeight);
    this.draw_grid()
  },

  draw_horizontal_line: function(y_axis){
    this.state.context.beginPath();
    this.state.context.moveTo(0, y_axis);
    this.state.context.lineTo(this.state.context.canvas.width, y_axis);
    this.state.context.lineWidth = 1;
    // set line color
    this.state.context.strokeStyle = '#000000';
    this.state.context.stroke();

    this.state.context.fillStyle='rgba(255, 153, 153, 0.2)';
    this.state.context.fillRect(0, this.state.start_line, this.state.canvas.width, this.state.end_line-this.state.start_line);
  },

  draw_start_and_end_lines: function(){
    this.clear_canvas()
    this.draw_horizontal_line(this.state.start_line)
    this.draw_horizontal_line(this.state.end_line)
    this.generate_time_bounds()
  },

  move_closest_line: function(drag_ordinates){
    if(drag_ordinates < 0){
      drag_ordinates = 0;
    }
    if(drag_ordinates > this.state.context.canvas.height){
      drag_ordinates = this.state.context.canvas.height;
    }

    var distance_to_start_line = null;
    var distance_to_end_line = null;
    if(this.state.start_line){
      distance_to_start_line = Math.abs(drag_ordinates.y - this.state.start_line)
    }
    if(this.state.end_line){
      distance_to_end_line = Math.abs(drag_ordinates.y - this.state.end_line)
    }

    if(this.state.start_line === null && this.state.end_line === null){
      this.setState({
        start_line: drag_ordinates.y
      }, this.draw_start_and_end_lines)
    }
    else if(this.state.start_line !== null && this.state.end_line === null) {
      if(drag_ordinates.y < this.state.start_line){
        console.log("moving start_line")
        this.setState({
          end_line: this.state.start_line,
          start_line: drag_ordinates.y
        }, this.draw_start_and_end_lines)
      } else if (drag_ordinates.y > this.state.start_line){
        console.log("moving end_line")
        this.setState({
          start_line: this.state.start_line,
          end_line: drag_ordinates.y
        }, this.draw_start_and_end_lines)
      }
    } else {
      if(distance_to_start_line < distance_to_end_line){
        console.log("moving start_line")
        this.setState({
          start_line: drag_ordinates.y
        }, this.draw_start_and_end_lines)
      } else if (distance_to_end_line <= distance_to_start_line) {
        console.log("moving end_line")
        this.setState({
          end_line: drag_ordinates.y
        }, this.draw_start_and_end_lines)
      }
    }
  },

  drag_start: function(evt){
    this.setState({dragging: true})
    var drag_ordinates = this.get_canvas_coordinates(evt);
    this.move_closest_line(drag_ordinates)
  },

  drag: function(evt){
    if(this.state.dragging){
      var drag_ordinates = this.get_canvas_coordinates(evt);
      this.move_closest_line(drag_ordinates);
    }
  },

  drag_stop: function(evt){
    // here we want to snap the start and end lines to their closest bounds
    this.setState({dragging: false})
  },

  setup_canvas: function(){
    this.clear_canvas();
    this.state.context.canvas.addEventListener('mousedown', this.drag_start, false);
    this.state.context.canvas.addEventListener('mousemove', this.drag, false);
    this.state.context.canvas.addEventListener('mouseup', this.drag_stop, false);
  },

  handleClick: function(event){
    var x = event.clientX;
    var y = event.clientY;
    console.log("x: " + x + " y: " + y);
  },

  componentDidMount: function(){
    this.setState({
      canvas: document.getElementById('TimePeriodSelectorCanvas'),
    }, () => {
      this.setState({
        context: this.state.canvas.getContext('2d'),
      }, () => {
        this.setup_canvas();
      })
    })

    window.addEventListener('mouseup', this.drag_stop)
  },

  render: function(){
    if(this.state === undefined){return(<div></div>)}
    return(
      <div width="500px" height="500px" style={this.props.style}>
        <canvas id="TimePeriodSelectorCanvas" style={{
          border: "1px solid #000000",
          height: "100%",
          width: "100%",
        }}>
        </canvas>
        <h3 style={{userSelect: "none"}}>{this.state.start_time !== undefined && this.state.end_time !== undefined ? `From: ${this.state.start_time} To: ${this.state.end_time}` : null}</h3>
      </div>
    )
  }
});
