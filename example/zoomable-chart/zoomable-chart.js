  function zoomableChart( chart, options ) {
		// declare defaults 		
		// console.log(chart)
		var x_min_max = getXMinMaxValues(chart)
		var y_min_max = getYMinMaxValues(chart)

		// default option if user doesnt provide any options
 		var defaults = {
 			xSlider: true,
 			ySlider: true,
 			xTooltip: true,
 			yTooltip: true,
 			xTooltipFormat: 'int', //(int | float)
 			yTooltipFormat: 'int', //(int | float)
 			xRange: {
 				min: x_min_max.min,
 				max: x_min_max.max,
 			},
 			yRange: {
 				min: y_min_max.min,
 				max: y_min_max.max,
 			},
 			xSelected: {
 				min: x_min_max.min,
 				max: x_min_max.max,
 			},
 			ySelected: {
 				min: y_min_max.min,
 				max: y_min_max.max,
 			},
 			xStep: 1,
 			yStep: 1

 		}
 		
 		// replace user option with default option
 		var settings = $.extend({}, defaults, options );
 		createSliders(chart, settings)
 		performActions(chart, settings)
  }

  function createSliders(chart, settings) {
  	var chart_id = $(chart.element).attr('id');
  	var slider_y = "<div class='zoomable-slider-y-div'><div id='"+ chart_id +"-slider-y' class='zoomable-slider-y'></div><button type='button' class='btn btn-xs btn-default pull-right zoomable-reset-y' data-toggle='tooltip' title='Reset Y axis'  id='"+ chart_id +"-reset-y'><i class='glyphicon glyphicon-refresh'></i></button></div>";
  	var slider_x = "<div class='col-sm-11'><div id='"+ chart_id +"-slider-x' class='zoomable-slider-x '></div><button type='button' class='btn btn-xs btn-default zoomable-reset-x'  data-toggle='tooltip' title='Reset X axis' id='"+ chart_id +"-reset-x'><i class='glyphicon glyphicon-refresh'></i></button></div>"
		$('#'+chart_id).addClass('zoomable-chart-custom-div')
		// console.log(chart.element)
		$(chart.element).wrapAll('<div class="zoomable-chart-div"></div>')
		// $(chart.element).replaceWith($(new_chart_div));
		// if x axis slider is true
		console.log(settings.xSlider)
		if(settings.xSlider == true) {
			$(slider_x).insertAfter($(chart.element).parent());	
		}

		// if y axis slider is true
		if(settings.ySlider == true) {
			$(slider_y).insertBefore($(chart.element));	
		}
		
		
  }

  function performActions(chart, settings) {
  	var chart_id = $(chart.element).attr('id');
  	// console.log(chart_id)
  	if(settings.ySlider) {
  		var dragYSlider = document.getElementById(chart_id +'-slider-y');	

			// Y Axis slider
			var ySlider = noUiSlider.create(dragYSlider, {
			    behaviour: 'drag-tap',
			    direction: 'rtl',
			    connect: true,
			    orientation: 'vertical',
			    tooltips: [ settings.yTooltip, settings.yTooltip ],
			    step: settings.yStep,
			    format: {
		      from: function(value) {
		      				if(settings.yTooltipFormat == 'int') {
		      					return parseInt(value);	
		      				} else if(settings.yTooltipFormat == 'float') {
		      					return parseFloat(value);	
		      				} else {
		      					return value;
		      				}
		              
		          },
		      to: function(value) {
		              if(settings.yTooltipFormat == 'int') {
		      					return parseInt(value);	
		      				} else if(settings.yTooltipFormat == 'float') {
		      					return parseFloat(value);	
		      				} else {
		      					return value;
		      				}
		          }
		      },
			    start: [settings.ySelected.min, settings.ySelected.max],
			    range: {
			        'min': [ settings.yRange.min ],
			        'max': [ settings.yRange.max ]
			    }
			});

			ySlider.on('update', function(value, handle) {
			  var slider_value = value;
			  chart.axis.range({max: {y: parseInt(slider_value[1])}, min: {y: parseInt(slider_value[0])}});
			});
  	}

  	if(settings.xSlider) {
  		var dragXSlider = document.getElementById(chart_id +'-slider-x');

			// X Axis slider
			var xSlider = noUiSlider.create(dragXSlider, {
			    behaviour: 'drag-tap',
			    connect: true,
			    // orientation: 'vertical',
			    tooltips: [ settings.xTooltip, settings.xTooltip ],
			    step: settings.xStep,
			    format: {
		      from: function(value) {
		              if(settings.xTooltipFormat == 'int') { 
		      					return parseInt(value);	
		      				} else if(settings.xTooltipFormat == 'float') { 
		      					return parseFloat(value);	
		      				} else {
		      					return value;
		      				}
		          },
		      to: function(value) {
		              if(settings.xTooltipFormat == 'int') {
		      					return parseInt(value);	
		      				} else if(settings.xTooltipFormat == 'float') {
		      					return parseFloat(value);	
		      				} else {
		      					return value;
		      				}
		          }
		      },
			    start: [settings.xSelected.min, settings.xSelected.max],
			    range: {
			        'min': [ settings.xRange.min ],
			        'max': [ settings.xRange.max ]
			    }
			});

			xSlider.on('update', function(value, handle) {
			  var slider_value = value;
			  chart.axis.range({max: {x: parseInt(slider_value[1])}, min: {x: parseInt(slider_value[0])}});
			});

  	}
  	
  	$('.noUi-tooltip').addClass('hidden');

  	$('.noUi-handle, .noUi-draggable').on('mouseover', function() {
  		// console.log($(this).parents('.noUi-origin').find('.noUi-tooltip'))
  		$(this).parents('.noUi-base').find('.noUi-tooltip').removeClass('hidden');
  	});

  	$('.noUi-handle, .noUi-draggable').on('mouseout', function() {
  		// console.log($(this).parents('.noUi-origin').find('.noUi-tooltip'))
  		$(this).parents('.noUi-base').find('.noUi-tooltip').addClass('hidden');
  	});

  	$('#'+ chart_id +'-reset-y').on('click', function() {
  		$('[data-toggle="tooltip"]').tooltip('hide');
  	  ySlider.reset()
  	});

  	$('#'+ chart_id +'-reset-x').on('click', function() {
  		$('[data-toggle="tooltip"]').tooltip('hide');
  	  xSlider.reset()
  	});
  }

  // get Y axis Min n Max value of chart
  function getYMinMaxValues(chart) {
      // console.log(chart.data.values('data2'))
      // console.log(chart.data())
      var chart_data = chart.data();
      // var max_value = 0;
      // var min_value = 0;
      var max_value     = chart_data[0].values[0].value;
      var min_value     = chart_data[0].values[0].value;
      $.each(chart_data, function(index, rows) {
          $.each(rows.values, function(index, val) {
              if(val.value > max_value) {
                  max_value = val.value;
              }

              if(val.value < min_value) {
                  min_value = val.value;
              }
          });
      });
      return ({min: min_value, max: max_value});
  }


  // get X axis Min n Max value of chart
  function getXMinMaxValues(chart) {
      var chart_data = chart.x();

      var max_value     = 0;
      var min_value     = 0;
      $.each(chart_data, function(index, rows) {
          $.each(rows, function(index, val) {
              if(val > max_value) {
                  max_value = val;
              }

              if(val < min_value) {
                  min_value = val;
              }
          });
      });
      return ({min: min_value, max: max_value});
  }



