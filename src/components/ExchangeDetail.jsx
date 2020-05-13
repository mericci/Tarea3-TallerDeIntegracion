import React, {Component} from 'react';
import TickerDetail from './TickerDetail';


class ExchangeDetail extends Component {
    constructor(props){
        super(props);
    
        this.state = {

        };    
      }
    render(){
        return (
            <div className="col-md-12">
                <h1>{this.props.exchange.name}</h1>
                <div className="exchange_info">
                    <table>
                        <tr>
                            <th>Volumen de compra</th>
                            <th>Volumen de venta</th>
                            <th>Volumen total</th>
                            <th>Cantidad de acciones</th>
                            <th>Participación de mercado</th>
    
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
    
                        </tr>
                    </table>
                    
                </div>
                <div>
                    {this.props.exchange.stocks.map(company => {
                        return(
                            <TickerDetail
                                key = {company.company}
                                ticker = {company}
                                prueba = {this.props.prueba}
                                big = {this.props.bigs[company.ticker]}
                                small = {this.props.smalls[company.ticker]}
                                last = {this.props.lasts[company.ticker]}
                                volume = {this.props.volume[company.ticker]}
                            /> 
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default ExchangeDetail;