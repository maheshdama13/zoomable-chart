$(document).ready(function() {
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


    zoomableChart(chart, {
        yMin:100,
        xSlider: true,
        ySlider: true,
        xStep:5,
        xTooltipFormat: 'int'

    });

    $(document).ready(function($) {
        $('[data-toggle="tooltip"]').tooltip();
    });
   
});