import React, {Component} from 'react';

import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

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
        
        chart.data = this.props.data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.color= "#FFF";
    
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
    
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
    
        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();
    
        this.chart = chart;
    };
    

    componentDidUpdate(prevProps) {

        if (this.props.prueba !== prevProps.prueba) {
            this.chart.data = this.props.data

        }
    }

        
    render() {
    
        
        return (
            <div>
                <div id={this.props.company} style={{ width: "100%", height: '300px' }}></div>

            </div>
        );
    }

};

export default Chart;