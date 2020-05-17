import React, {Component} from 'react';
import './App.css';
import ExchangeDetail from './components/ExchangeDetail';

import io from 'socket.io-client'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);


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
      prev_last_updates: {},
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
                prev_last_updates: {[stock.ticker]: 0, ...this.state.prev_last_updates},
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
        var now = new Date();
        stocks_updates[data.ticker].push({date: now.getHours() + ':0' + now.getMinutes() , value: data.value })
        //console.log(stocks_updates[data.ticker])
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
        this.state.prev_last_updates[data.ticker] = this.state.last_updates[data.ticker];
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
              <div className="exchange-map">
                <div className="row exchange-title-info">
                    <div className="col-md-6 border-right title-exchange">
                        <h1>{exchange.name}</h1>
                    </div>
                    <div className="exchange_info col-md-6 border-left">
                        <div>
                            <table className="exchange-table">
                                <tr>
                                    <th className="th-info-exchange">Volumen de compra</th>
                                    <th className="th-info-exchange">Volumen de venta</th>
                                    <th className="th-info-exchange">Volumen total</th>
                                    <th className="th-info-exchange">Cantidad de acciones</th>
                                    <th className="th-info-exchange">Participación de mercado</th>
            
                                </tr>
                                <tr>
                                    <th className="th-info-exchange">{exchange.buy_volume}</th>
                                    <th className="th-info-exchange">{exchange.sell_volume}</th>
                                    <th className="th-info-exchange">{this.state.exchange_volume[exchange.name]}</th>
                                    <th className="th-info-exchange">{exchange.stocks.length}</th>
                                    <th className="th-info-exchange">{Math.round(((this.state.exchange_volume[exchange.name])/this.state.all_exchange_volume)*10000)/100}</th>
            
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="table-ticker-div">
                    
                        {exchange.stocks.map(company => {
                            return(
                              <div className="ticker">
                              <div className="col-md-12 border-right company">
                                  <table className="ticker-table">
                                      <tr>
                                          <div className='title-table'>
                                              <h3 className="title-ticker">{company.company} <span className="ticker-company">({company.ticker})</span></h3>
                                              <h5 className="country">{company.country}</h5>
                                          </div>      
                                      </tr>
                                      <tr>
                                          <div>
                                           {console.log(this.state.stock_data[company.ticker])}
                                           <div id="chart" >
                                            <LineChart width={820} height={300} data={[...this.state.stock_data[company.ticker]]}>
                                                
                                                <XAxis dataKey="date" stroke="azure"/>
                                                <YAxis stroke="azure" domain={["dataMin-10", "dataMax+10"]}/>
                                                <Tooltip 
                                                  formatter={
                                                    function(value, name) {
                                                      return company.money +': ' + value;
                                                    }
                                                    
                                                  }
                                                  labelFormatter={function(value) {
                                                    return 'time: ' + value;
                                                  }}
                                                  
                                                />
                                                <Line dataKey="value" stroke="cornflowerblue" fill="cornflowerblue" strokeWidth={2} />
                                            </LineChart>
                                          </div>
                                          </div>  
                                          <tr>
                                              <th>Volumen Total</th>
                                              <th>Alto Histórico</th>
                                              <th>Bajo Histórico</th>
                                              <th>Último Precio</th>
                                              <th>Variación (%)</th>
                                          </tr>
                                          <tr>
                                              <th>{this.state.total_volume[company.ticker]}</th>
                                              <th>{this.state.big_updates[company.ticker]}</th>
                                              <th>{this.state.small_updates[company.ticker]}</th>
                                              <th>{this.state.last_updates[company.ticker]}</th>
                                              {
                                                this.state.prev_last_updates[company.ticker] !== 0 &&
                                                <th>{Math.round(((this.state.last_updates[company.ticker]-this.state.prev_last_updates[company.ticker])/-this.state.prev_last_updates[company.ticker]*10000))/100}</th>
                                              }
                                              {
                                                this.state.prev_last_updates[company.ticker] === 0 && <th>0</th>
                                              }
                                              
                                          </tr>
                                      </tr>
                                      
                                          
                                  </table>
                              </div>
              
                          </div>
                                
                            )
                        })}
                    
                </div>
            </div>
              </div>
            )
          })}

      </div>
    );
  }
}


export default App;
