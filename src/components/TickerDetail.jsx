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
            const porc_var = Math.round(((this.props.last - prevProps.last)/prevProps.last)*10000)/100
            this.setState({
                variation: porc_var + "%"
            })
    
        }
    }

    render(){
        return (
            <div className="row ticker">
                <div className="col-md-6 border-right company">
        

                <table>
                    <tr>
                
                        
                            <div className='title-table'>
                                <h3>{this.props.ticker.company}</h3>
                            </div>
                        
                    </tr>
                    <tr>
                        <div>
                            <Chart 
                                key={this.props.ticker.company}
                                data = {this.props.ticker.update}
                                time = {this.props.ticker.update_time}
                                title = {this.props.ticker.company}
                                company = {this.props.ticker.company}
                                prueba = {this.props.prueba}
                            />
                        </div>
                        <tr>
                            <th>Volumen Total</th>
                            <th>Alto Histórico</th>
                            <th>Bajo Histórico</th>
                            <th>Último Precio</th>
                            <th>Variación (%)</th>
                        </tr>
                        <tr>
                            <th>{this.props.volume}</th>
                            <th>{this.state.big}</th>
                            <th>{this.state.small}</th>
                            <th>{this.state.last}</th>
                            <th>{this.state.variation}</th>
                        </tr>
                    </tr>
                    
                        
                </table>
                </div>

            </div>
        );
    }
}

export default TickerDetail;