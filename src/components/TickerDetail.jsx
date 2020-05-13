import React, {Component} from 'react';

import Chart from './Chart';

class TickerDetail extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            volume: 0,
            big: 0,
            small: 0,
            last: 0,
            variation: '0%'
        };    
      }
    //Chart.setOption({series:[{data:props.ticker.update}]})

    componentDidMount(){
        this.setState({
            volume: this.props.volume,
            big: this.props.big,
            small: this.props.small,
            last: this.props.last
        })

    }

    componentDidUpdate(prevProps){
        if (this.props.prueba !== prevProps.prueba) {
            this.setState({
                volume: this.props.volume,
                big: this.props.big,
                small: this.props.small,
                last: this.props.last
            })
    
        }
        if (this.props.last !== prevProps.last) {
            console.log(prevProps.last - this.props.last)
            const porc_var = Math.round(((this.props.last - prevProps.last)/prevProps.last)*10000)/100
            this.setState({
                variation: porc_var + "%"
            })
    
        }
    }

    render(){
        return (
            <div className="row ticker">
                <div className="col-md-8 border-right company">
                    <h3>{this.props.ticker.company}</h3>
                    <Chart 
                        key={this.props.ticker.company}
                        data = {this.props.ticker.update}
                        time = {this.props.ticker.update_time}
                        title = {this.props.ticker.company}
                        company = {this.props.ticker.company}
                        prueba = {this.props.prueba}
                    />
                </div>



                <div className="col-md-4 border-left company_data">
                    <table>
                        <tr>
                            <th>Volumen Total Transado</th>
                            <th>{this.state.volume}</th>
                        </tr>
                        <tr>
                            <th>Alto Histórico</th>
                             <th>{this.state.big}</th>
                        </tr>
                        <tr>
                            <th>Bajo Histórico</th>
                            <th>{this.state.small}</th>
                        </tr>
                        <tr>
                            <th>Último Precio</th>
                            <th>{this.state.last}</th>
                        </tr>
                        <tr>
                            <th>Variación (%)</th>
                            <th>{this.state.variation}</th>
                        </tr>
                            
                    </table>
                </div>

            </div>
        );
    }
}

export default TickerDetail;