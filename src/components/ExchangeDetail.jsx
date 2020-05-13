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
    
    componentDidMount(){
        this.setState({
            buy_volume: this.props.exchange.buy_volume,
            sell_volume: this.props.exchange.sell_volume,
            total_volume: this.props.exchange.buy_volume + this.props.exchange.sell_volume,
            actions_count: this.props.exchange.stocks.length,
            participation: 0
        })

    }

    componentDidUpdate(prevProps){
        if (this.props.prueba !== prevProps.prueba) {
            this.setState({
                buy_volume: this.props.exchange.buy_volume,
                sell_volume: this.props.exchange.sell_volume,
                total_volume: this.props.exchange.buy_volume + this.props.exchange.sell_volume,
                actions_count: this.props.exchange.stocks.length,
            })
            this.setState({
                participation: Math.round((this.state.total_volume/this.props.total_volume)*10000)/100
            })
    
        }

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
                            <th>{this.state.buy_volume}</th>
                            <th>{this.state.sell_volume}</th>
                            <th>{this.state.total_volume}</th>
                            <th>{this.state.actions_count}</th>
                            <th>{this.state.participation}</th>
    
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