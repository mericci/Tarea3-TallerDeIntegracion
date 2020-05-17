import React, {Component} from 'react';
import './App.css';
import ExchangeDetail from './components/ExchangeDetail';

import io from 'socket.io-client'


const server = 'wss://le-18262636.bitzonte.com';

const socket = io(server, {  
  path: '/stocks'
});

class App extends Component{

  constructor(){
    super();

    this.state = {
      stock_exchange: {},
      exchanges: [],
      is_loading: false,
      prueba: [],
      big_updates: {},
      small_updates: {},
      last_updates: {},
      total_volume: {},
      all_exchange_volume: 0,
      buy_volume: {},
      sell_volume: {},
      exchange_volume: {},
      button_text: 'Desconectar Socket',
      stock_data: {},
      stock_act : {}

    };    
  }

  set_exchanges = () => {
    socket.emit('EXCHANGES')
      socket.on('EXCHANGES', (data) => {
        socket.emit('STOCKS');
        socket.on('STOCKS', (stocks_info) => {
          if (!this.state.is_loading){
            const exchange_info = Object.entries(data).map(([key,value])=>{return(value)});
            exchange_info.map(exchange => {
              this.setState({exchange_volume: {[exchange.name]: 0, ...this.state.exchange_volume}})

              exchange.listed_companies.map(comp => {
                stocks_info.map(stock => {
                  this.setState({stock_data: {[stock.ticker]: [], ...this.state.stock_data}})
                  if(comp === stock.company_name) {
                    this.setState({stock_exchange: {[stock.ticker]: exchange.name, ...this.state.stock_exchange}})
                  }
                })
              })
            })

            this.setState({exchanges: Object.entries(data).map(([key,value])=>{    
                return({
                  name: value.name,
                  exchange_ticker: value.exchange_ticker,
                  stocks: 
                    value.listed_companies.map(company => {
                      var tick = '';
                      var money = '';
                      var country = '';
                      stocks_info.map(stock => {
                        if (company === stock.company_name){
                          tick = stock.ticker;
                          money = stock.quote_base;
                          country = stock.country
                        }
                      })
                      return {
                        company: company,
                        update: [],
                        update_time: [],
                        buy: [],
                        sell: [],
                        ticker: tick,
                        money: money,
                        country: country
                      }
                    }),
                    buy_volume: 0,
                    sell_volume: 0,
                })
              })
            });
          
            stocks_info.map(stock => {
              this.setState({
                big_updates: {[stock.ticker]: 0, ...this.state.big_updates},
                small_updates: {[stock.ticker]: Infinity, ...this.state.small_updates},
                last_updates: {[stock.ticker]: 0, ...this.state.last_updates},
                total_volume: {[stock.ticker]: 0, ...this.state.total_volume},
                buy_volume: {[stock.ticker]: 0, ...this.state.buy_volume},
                sell_volume: {[stock.ticker]: 0, ...this.state.sell_volume},
              })
            })
          }
          this.setState({is_loading: true})
        });
      })
      
  }

  set_updates = () => {
    socket.on('UPDATE', (data) => {
      if(this.state.is_loading){
        var exchange_input = this.state.stock_exchange[data.ticker]; //{[stock.ticker]: exchange.name, ...this.state.stock_exchange}})
  
        let stocks_updates = {...this.state.stock_data}
        //console.log(data.ticker+ ' ' + stocks_updates[data.ticker])
        stocks_updates[data.ticker].push({date: data.time, value: data.value })
        this.setState({stock_data: stocks_updates})
        //this.setState({stock_data: {[data.ticker]: this.state.stock_data[data.ticker].push({date: data.time, value: data.value }), ...this.state.stock_data}})
        this.state.exchanges.map(exchange => {
          if(exchange.name === exchange_input) {
            exchange.stocks.map(stock => {
              if(stock.ticker === data.ticker) {
                stock.update.push({date: data.time, value: data.value }) //update.length - 1
              }
            })
          }
        });

        this.state.last_updates[data.ticker] = data.value;
        if(data.value > this.state.big_updates[data.ticker]) {
          this.state.big_updates[data.ticker] = data.value;
        } 
        if(data.value < this.state.small_updates[data.ticker]) {
          this.state.small_updates[data.ticker] = data.value;
        }
  
        //this.setState({prueba: [{date: data.time, value: data.value }, ...this.state.prueba] })
      }
    });

  }

  set_buy = () => {
    socket.on('BUY', (data) => {
      if(this.state.is_loading){
        var exchange_input = this.state.stock_exchange[data.ticker];
        
        if(isNaN(this.state.total_volume[data.ticker])){
          this.state.total_volume[data.ticker] = 0;
        }
        this.state.total_volume[data.ticker] += data.volume;
        this.state.buy_volume[data.ticker] += data.volume;
        var exchange_input = this.state.stock_exchange[data.ticker];
        this.state.exchanges.map(exchange => {
          if(exchange.name === exchange_input) {
            if(exchange.name === exchange_input) {
              exchange.buy_volume += data.volume
            }
          }
        });
        this.state.exchange_volume[exchange_input] += data.volume;
        this.state.all_exchange_volume += data.volume;
      }
    });

  }

  set_sell = () => {
    socket.on('SELL', (data) => {
      if(this.state.is_loading){
        var exchange_input = this.state.stock_exchange[data.ticker];
      
        if(isNaN(this.state.total_volume[data.ticker])){
          this.state.total_volume[data.ticker] = 0;
        }
        this.state.total_volume[data.ticker] += data.volume;
        this.state.sell_volume[data.ticker] += data.volume;
        var exchange_input = this.state.stock_exchange[data.ticker];
        this.state.exchanges.map(exchange => {
          if(exchange.name === exchange_input) {
              exchange.sell_volume += data.volume
            }
        
          }
        );
        this.state.exchange_volume[exchange_input] += data.volume;
        this.state.all_exchange_volume += data.volume;
      }
    });
  }
  


  componentDidMount() {
      this.set_exchanges();
      this.set_updates();
      this.set_buy();
      this.set_sell();   
  }

  control_socket = () => {
    if(socket.connected){
      socket.disconnect()
      this.setState({button_text: 'Reconectar Socket'})
    }
    else {
      socket.connect()
      this.setState({button_text: 'Desconectar Socket'});
    }
  }

  
  
  render() {



    return(
      <div className="App">
          <div className="socket-control">
            <h2>Tarea 3 - Taller de Integración</h2>
            <button className="button" onClick={this.control_socket}>{this.state.button_text}</button>
          </div>
          {this.state.exchanges.map(exchange => {
            return(
              <div className="exchange" key={exchange.name}>
                <ExchangeDetail
                  key={exchange.name} 
                  exchange = {exchange}
                  prueba = {this.state.prueba}
                  bigs = {this.state.big_updates}
                  smalls = {this.state.small_updates}
                  lasts = {this.state.last_updates}
                  volume = {this.state.total_volume}
                  total_volume = {this.state.all_exchange_volume}
                  buy_volume = {this.state.buy_volume}
                  sell_volume = {this.state.sell_volume}
                  exchange_volume = {this.state.exchange_volume[exchange.name]}
                  stock_data = {this.state.stock_data}
                />
              </div>
            )
          })}

      </div>
    );
  }
}


export default App;
