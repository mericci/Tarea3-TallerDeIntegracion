import React, {Component} from 'react';
import './App.css';
import ExchangeDetail from './components/ExchangeDetail';

import io from 'socket.io-client'


const server = 'wss://le-18262636.bitzonte.com';

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
      all_exchange_volume: 0

    };    
  }

  wait = () => {

  }

  componentDidMount() {
      const socket = io(server, {  
        path: '/stocks'
      });
     
      socket.emit('EXCHANGES')
      socket.on('EXCHANGES', (data) => {
        socket.emit('STOCKS');
        socket.on('STOCKS', (stocks_info) => {
          const exchange_info = Object.entries(data).map(([key,value])=>{return(value)});
          exchange_info.map(exchange => {
            exchange.listed_companies.map(comp => {
              stocks_info.map(stock => {
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
                    stocks_info.map(stock => {
                      if (company === stock.company_name){
                        tick = stock.ticker;
                      }
                    })
                    return {
                      company: company,
                      update: [],
                      update_time: [],
                      buy: [],
                      sell: [],
                      ticker: tick,
          
                    }
                  }),
                  buy_volume: 0,
                  sell_volume: 0,
              })
            })
          });
        
          stocks_info.map(stock => {
            this.setState({big_updates: {[stock.ticker]: 0, ...this.state.big_updates}})
            this.setState({small_updates: {[stock.ticker]: Infinity, ...this.state.small_updates}})
            this.setState({last_updates: {[stock.ticker]: 0, ...this.state.last_updates}})
            this.setState({total_volume: {[stock.ticker]: 0, ...this.state.total_volume}})
          })
          
        
        
        });
      });

      socket.on('UPDATE', (data) => {
        var exchange_input = this.state.stock_exchange[data.ticker];
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

        this.setState({prueba: [{date: data.time, value: data.value }, ...this.state.prueba] })

        //console.log(this.state.prueba)

        
        

        

      });

      socket.on('BUY', (data) => {
        this.state.all_exchange_volume += data.volume;
        this.state.total_volume[data.ticker] += data.volume;
        var exchange_input = this.state.stock_exchange[data.ticker];
        this.state.exchanges.map(exchange => {
          if(exchange.name === exchange_input) {
            if(exchange.name === exchange_input) {
              exchange.buy_volume += data.volume
            }
          }
        });
      
      });

      socket.on('SELL', (data) => {
        this.state.all_exchange_volume += data.volume;
        this.state.total_volume[data.ticker] += data.volume;
        var exchange_input = this.state.stock_exchange[data.ticker];
        this.state.exchanges.map(exchange => {
          if(exchange.name === exchange_input) {
              exchange.sell_volume += data.volume
            }
        
          }
        );
      });
      
  }


  
  render() {
    return(
      <div className="App">
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
                />
              </div>
            )
          })}

      </div>
    );
  }
}


export default App;
