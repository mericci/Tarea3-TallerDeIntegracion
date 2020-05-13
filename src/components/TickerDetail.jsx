import React, {Component} from 'react';

import Chart from './Chart';

class TickerDetail extends Component {
    constructor(props){
        super(props);
    
        this.state = {

        };    
      }
    //Chart.setOption({series:[{data:props.ticker.update}]})

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
                            <th></th>
                        </tr>
                        <tr>
                            <th>Alto Histórico</th>
                             <th>{this.props.big}</th>
                        </tr>
                        <tr>
                            <th>Bajo Histórico</th>
                            <th>{this.props.small}</th>
                        </tr>
                        <tr>
                            <th>Último Precio</th>
                            <th>{this.props.last}</th>
                        </tr>
                        <tr>
                            <th>Variación Porcentual</th>
                            <th></th>
                        </tr>
                            
                    </table>
                </div>

            </div>
        );
    }
}

export default TickerDetail;