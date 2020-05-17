import React, {Component} from 'react';
import TickerDetail from './TickerDetail';


class ExchangeDetail extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            buy_volume: 0,
            sell_volume: 0,
            total_volume: 0,
            actions_count: 0,
            participation: 0
        };    
    }
    
    // componentDidMount(){
    //     this.setState({
    //         buy_volume: this.props.exchange.buy_volume,
    //         sell_volume: this.props.exchange.sell_volume,
    //         total_volume: this.props.exchange.buy_volume + this.props.exchange.sell_volume,
    //         actions_count: this.props.exchange.stocks.length,
    //         participation: 0
    //     })

    // }

    // componentDidUpdate(prevProps){
    //     if (this.props.buy_sell) {
           
    //         console.log(this.props.exchange.buy_volume + this.props.exchange.sell_volume)
    //     }

    // }
    
    render(){
        return (
            <div className="exchange-map">
                <div className="row exchange-title-info">
                    <div className="col-md-6 border-right title-exchange">
                        <h1>{this.props.exchange.name}</h1>
                    </div>
                    <div className="exchange_info col-md-6 border-left">
                        <div>
                            <table className="exchange-table">
                                <tr>
                                    <th>Volumen de compra</th>
                                    <th>Volumen de venta</th>
                                    <th>Volumen total</th>
                                    <th>Cantidad de acciones</th>
                                    <th>Participación de mercado</th>
            
                                </tr>
                                <tr>
                                    <th>{this.props.exchange.buy_volume}</th>
                                    <th>{this.props.exchange.sell_volume}</th>
                                    <th>{this.props.exchange_volume}</th>
                                    <th>{this.props.exchange.stocks.length}</th>
                                    <th>{Math.round(((this.props.exchange_volume)/this.props.total_volume)*10000)/100}</th>
            
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="table-ticker-div row">
                    
                        {this.props.exchange.stocks.map(company => {
                            //console.log(company.ticker)
                            return(
                                // <div className="table-ticker-div">
                                // <table className="table-tickers">
                                    // <th>
                                        <TickerDetail
                                            key = {company.company}
                                            ticker = {company}
                                            prueba = {this.props.prueba}
                                            big = {this.props.bigs[company.ticker]}
                                            small = {this.props.smalls[company.ticker]}
                                            last = {this.props.lasts[company.ticker]}
                                            volume = {this.props.volume[company.ticker]}
                                            buy_volume = {this.props.buy_volume[company.ticker]}
                                            sell_volume = {this.props.sell_volume[company.ticker]}
                                        /> 
                                    // </th>
                                // </table>
                                //  </div>
                                
                            )
                        })}
                    
                </div>
            </div>
        );
    }
}

export default ExchangeDetail;