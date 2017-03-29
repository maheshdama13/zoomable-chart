# zoomable-chart
Zoomable Chart is a combination of "C3" reusable chart library and "noUiSlider" that enables Zoom functionality for X axis as well as Y axis of Line charts and Bar charts into web applications. 


A zoom and pan plugin for C3 chart >= 0.4.11

Panning and zooming can be done via slider. noUiSlider is used for slider. <br/>
#Libraries used: <br/>
https://github.com/jquery/jquery<br/>
https://github.com/twbs/bootstrap<br/>
https://github.com/c3js/c3 <br/>
https://github.com/leongersen/noUiSlider <br/> <br/>
Live Demo https://codepen.io/maheshdama13/pen/KWqXjb <br/><br/>

#How it works
```javascript
	zoomableChart(C3 Chart Variable, Options);
```

#Example

```javascript
    //initialise c3 chart
    var chart = c3.generate({
        bindto: '#chart1',
        data: {
            xs: {
                'data1': 'x1',
                'data2': 'x2',
            },
            columns: [
                ['x1', 10, 30, 45, 50, 70, 100],
                ['x2', 30, 50, 75, 100, 120],
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 20, 180, 240, 100, 190]
            ]
        }
    });
    
    //initialise zoomableChart pass c3 charts variable to it with options
    zoomableChart(chart, {
        yMin:100,
        xSlider: true,
        ySlider: true,
        xStep:5,
        xTooltipFormat: 'int'

    });
});
```

#<b>Options:</b><br/>

#<big><b>Sliders</b></big><br/>
<b>To display X axis slider:</b>
```javascript
xSlider: true | false (default: true)
```


<b>To display Y axis slider:</b>
```javascript
ySlider: true | false (default: true)
```

#<big><b>Tooltips</b></big><br/>
<b>X axis tooltip</b>
```javascript
xTooltip: true | false (default: true)
```

<b>Y axis tooltip</b>
```javascript
yTooltip: true | false (default: true)
```

<b>X axis tooltip Format</b>
```javascript
xTooltipFormat: 'int' | 'float' (default: 'int')
```

<b>Y axis tooltip Format</b>
```javascript
yTooltipFormat: 'int' | 'float' (default: 'int')
```

#<big><b>Range</b></big><br/>
<b>X axis range</b> (if not given than it will take automatically)
```javascript
xRange: {
	min: 0 to n,
	max: 0 to n
}
```

<b>Y axis range</b> (if not given than it will take automatically)
```javascript
yRange: {
	min: 0 to n,
	max: 0 to n
}
```

#<big><b>Selected Range</b> (Define zoom range while page load)</big><br/>
<b>X axis selected range</b> (if not given than it will take automatically)
```javascript
xSelected: {
	min: 0 to n,
	max: 0 to n,
}
```


<b>Y axis selected range</b> (if not given than it will take automatically)
```javascript
ySelected: {
	min: 0 to n,
	max: 0 to n,
}
```

#<big><b>Define step of sliders:</b></big><br/>
<b>X axis Step:</b>
```javascript
xStep: 1 to n (default:1)
```

<b>Y axis Step:</b>
```javascript
yStep: 1 to n (default:1)
```

