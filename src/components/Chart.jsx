import React, {Component} from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);


class Chart extends Component {
    constructor(props){
        super(props);
        this.boxRef = React.createRef();
        this.state = {

        };    
    };

    componentDidMount() {
        let chart = am4core.create(this.props.company, am4charts.XYChart);
        
        chart.data = [...this.props.stock_data];


        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
    
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
    
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY} " + this.props.ticker.money;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
    
        this.chart = chart;
    };

    componentDidUpdate(prevProps) {
        console.log(this.props.stock_data)
        console.log(prevProps.stock_data)
        if (this.props.stock_data !== prevProps.stock_data) {
            this.chart.data = this.props.stock_data

        }
    }

        
    render() {

        return (
            <div id={this.props.company} style={{ width: "100%", height: '300px' }}></div>
        );
    }

};

export default Chart;