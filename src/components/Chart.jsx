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
    
        // // let option = {
        // //     title: {
        // //         text: this.props.title,
        // //         textStyle: {
        // //             color: '#FFF'
        // //         }
        // //     },
        // //     tooltip: {
        // //         trigger: 'axis',
        // //         // formatter: function (params) {
        // //         //     params = params[0];
        // //         //     var date = new Date(params.name);
        // //         //     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        // //         // },
        // //         axisPointer: {
        // //             animation: false
        // //         }
        // //     },
        // //     xAxis: {
        // //         type: 'time',
        // //         splitLine: {
        // //             show: false
        // //         },
        // //         axisLine: {
        // //             lineStyle: {
        // //                 color: '#FFF'
        // //             }
        // //         }
        // //     },
        // //     yAxis: {
        // //         type: 'value',
        // //         boundaryGap: [0, '100%'],
        // //         splitLine: {
        // //             show: false
        // //         },
        // //         axisLine: {
        // //             lineStyle: {
        // //                 color: '#FFF'
        // //             }
        // //         }
        // //     },
        // //     series: [{
        // //         name: 'CHART',
        // //         type: 'line',
        // //         showSymbol: false,
        // //         hoverAnimation: false,
        // //         data: this.props.data
        // //     }]
        // // };

        // const setInterval = () => {
        //     //console.log(this.boxRef)
        //     let charts = echarts.init(document.getElementById('chart')); //ref={this.boxRef} this.boxRef.current
        //     this.option.series[0].data = this.props.data;
        
        //     charts.setOption(this.option);
        // }
        
        return (
            <div>
                <div id={this.props.company} style={{ width: "90%", height: '300px' }}></div>
                {/* <div id="chart" >
                    <ReactEcharts
                        ref={this.boxRef}
                        option={this.option}
                        style={{height: 360}}
                        opts={{renderer: 'svg'}}
                        onChartReady={setInterval}
                        notMerge={true}
                        lazyUpdate={true}
    
                    /> 
                </div> */}
            </div>
        );
    }

};

export default Chart;