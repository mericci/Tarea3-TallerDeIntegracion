(this.webpackJsonptarea3=this.webpackJsonptarea3||[]).push([[0],{150:function(e,t,a){e.exports=a(189)},155:function(e,t,a){},156:function(e,t,a){},186:function(e,t){},189:function(e,t,a){"use strict";a.r(t);var l=a(20),n=a.n(l),c=a(144),s=a.n(c),o=(a(155),a(146)),r=a(55),i=a(62),u=a(127),m=a(67),p=a(68),h=a(72),v=a(71),b=(a(156),a(120)),d=a(90),_=a(147),k=a(148);b.b(k.a),b.b(_.a);var g=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(e){var l;return Object(m.a)(this,a),(l=t.call(this,e)).boxRef=n.a.createRef(),l.state={},l}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=b.a(this.props.company,d.d);e.data=this.props.data;var t=e.xAxes.push(new d.a);t.renderer.grid.template.location=0;var a=e.yAxes.push(new d.c);a.tooltip.disabled=!0,a.renderer.minWidth=35;var l=e.series.push(new d.b);l.dataFields.dateX="date",l.dataFields.valueY="value",l.tooltipText="{valueY} "+this.props.ticker.money,e.cursor=new d.e,e.cursor.xAxis=t,this.chart=e}},{key:"componentDidUpdate",value:function(e){this.props.prueba!==e.prueba&&(this.chart.data=this.props.data)}},{key:"render",value:function(){return n.a.createElement("div",{id:this.props.company,style:{width:"100%",height:"300px"}})}}]),a}(l.Component),E=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(e){var l;return Object(m.a)(this,a),(l=t.call(this,e)).state={volume:0,big:0,small:0,last:0,variation:"0%"},l}return Object(p.a)(a,[{key:"componentDidUpdate",value:function(e){if(this.props.prueba!==e.prueba&&this.setState({volume:this.props.volume,big:this.props.big,small:this.props.small,last:this.props.last}),this.props.last!==e.last){var t=Math.round((this.props.last-e.last)/e.last*1e4)/100;this.setState({variation:t+"%"})}}},{key:"render",value:function(){return n.a.createElement("div",{className:"ticker"},n.a.createElement("div",{className:"col-md-12 border-right company"},n.a.createElement("table",{className:"ticker-table"},n.a.createElement("tr",null,n.a.createElement("div",{className:"title-table"},n.a.createElement("h3",{className:"title-ticker"},this.props.ticker.company," ",n.a.createElement("span",{className:"ticker-company"},"(",this.props.ticker.ticker,")")),n.a.createElement("h5",{className:"country"},this.props.ticker.country))),n.a.createElement("tr",null,n.a.createElement("div",null,n.a.createElement(g,{key:this.props.ticker.company,data:this.props.ticker.update,time:this.props.ticker.update_time,title:this.props.ticker.company,company:this.props.ticker.company,prueba:this.props.prueba,ticker:this.props.ticker})),n.a.createElement("tr",null,n.a.createElement("th",null,"Volumen Total"),n.a.createElement("th",null,"Alto Hist\xf3rico"),n.a.createElement("th",null,"Bajo Hist\xf3rico"),n.a.createElement("th",null,"\xdaltimo Precio"),n.a.createElement("th",null,"Variaci\xf3n (%)")),n.a.createElement("tr",null,n.a.createElement("th",null,this.props.volume),n.a.createElement("th",null,this.state.big),n.a.createElement("th",null,this.state.small),n.a.createElement("th",null,this.state.last),n.a.createElement("th",null,this.state.variation))))))}}]),a}(l.Component),x=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(e){var l;return Object(m.a)(this,a),(l=t.call(this,e)).state={buy_volume:0,sell_volume:0,total_volume:0,actions_count:0,participation:0},l}return Object(p.a)(a,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"exchange-map"},n.a.createElement("div",{className:"row exchange-title-info"},n.a.createElement("div",{className:"col-md-6 border-right title-exchange"},n.a.createElement("h1",null,this.props.exchange.name)),n.a.createElement("div",{className:"exchange_info col-md-6 border-left"},n.a.createElement("div",null,n.a.createElement("table",{className:"exchange-table"},n.a.createElement("tr",null,n.a.createElement("th",null,"Volumen de compra"),n.a.createElement("th",null,"Volumen de venta"),n.a.createElement("th",null,"Volumen total"),n.a.createElement("th",null,"Cantidad de acciones"),n.a.createElement("th",null,"Participaci\xf3n de mercado")),n.a.createElement("tr",null,n.a.createElement("th",null,this.props.exchange.buy_volume),n.a.createElement("th",null,this.props.exchange.sell_volume),n.a.createElement("th",null,this.props.exchange_volume),n.a.createElement("th",null,this.props.exchange.stocks.length),n.a.createElement("th",null,Math.round(this.props.exchange_volume/this.props.total_volume*1e4)/100)))))),n.a.createElement("div",{className:"table-ticker-div row"},this.props.exchange.stocks.map((function(t){return n.a.createElement("table",{className:"table-tickers"},n.a.createElement("th",null,n.a.createElement(E,{key:t.company,ticker:t,prueba:e.props.prueba,big:e.props.bigs[t.ticker],small:e.props.smalls[t.ticker],last:e.props.lasts[t.ticker],volume:e.props.volume[t.ticker],buy_volume:e.props.buy_volume[t.ticker],sell_volume:e.props.sell_volume[t.ticker]})))}))))}}]),a}(l.Component),f=a(145),y=a.n(f)()("wss://le-18262636.bitzonte.com",{path:"/stocks"}),O=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(){var e;return Object(m.a)(this,a),(e=t.call(this)).control_socket=function(){y.connected?(y.disconnect(),e.setState({button_text:"Reconectar Socket"})):(y.connect(),e.setState({button_text:"Desconectar Socket"}))},e.state={stock_exchange:{},exchanges:[],is_loading:!0,prueba:[],big_updates:{},small_updates:{},last_updates:{},total_volume:{},all_exchange_volume:0,buy_volume:{},sell_volume:{},exchange_volume:{},button_text:"Desconectar Socket"},e}return Object(p.a)(a,[{key:"componentDidMount",value:function(){var e=this;y.emit("EXCHANGES"),y.on("EXCHANGES",(function(t){y.emit("STOCKS"),y.on("STOCKS",(function(a){Object.entries(t).map((function(e){var t=Object(u.a)(e,2);t[0];return t[1]})).map((function(t){e.setState({exchange_volume:Object(i.a)(Object(r.a)({},t.name,0),e.state.exchange_volume)}),t.listed_companies.map((function(l){a.map((function(a){l===a.company_name&&e.setState({stock_exchange:Object(i.a)(Object(r.a)({},a.ticker,t.name),e.state.stock_exchange)})}))}))})),e.setState({exchanges:Object.entries(t).map((function(e){var t=Object(u.a)(e,2),l=(t[0],t[1]);return{name:l.name,exchange_ticker:l.exchange_ticker,stocks:l.listed_companies.map((function(e){var t="",l="",n="";return a.map((function(a){e===a.company_name&&(t=a.ticker,l=a.quote_base,n=a.country)})),{company:e,update:[],update_time:[],buy:[],sell:[],ticker:t,money:l,country:n}})),buy_volume:0,sell_volume:0}}))}),a.map((function(t){e.setState({big_updates:Object(i.a)(Object(r.a)({},t.ticker,0),e.state.big_updates),small_updates:Object(i.a)(Object(r.a)({},t.ticker,1/0),e.state.small_updates),last_updates:Object(i.a)(Object(r.a)({},t.ticker,0),e.state.last_updates),total_volume:Object(i.a)(Object(r.a)({},t.ticker,0),e.state.total_volume),buy_volume:Object(i.a)(Object(r.a)({},t.ticker,0),e.state.buy_volume),sell_volume:Object(i.a)(Object(r.a)({},t.ticker,0),e.state.sell_volume)})}))}))})),y.on("UPDATE",(function(t){var a=e.state.stock_exchange[t.ticker];e.state.exchanges.map((function(e){e.name===a&&e.stocks.map((function(e){e.ticker===t.ticker&&e.update.push({date:t.time,value:t.value})}))})),e.state.last_updates[t.ticker]=t.value,t.value>e.state.big_updates[t.ticker]&&(e.state.big_updates[t.ticker]=t.value),t.value<e.state.small_updates[t.ticker]&&(e.state.small_updates[t.ticker]=t.value),e.setState({prueba:[{date:t.time,value:t.value}].concat(Object(o.a)(e.state.prueba))})})),y.on("BUY",(function(t){var a=e.state.stock_exchange[t.ticker];isNaN(e.state.total_volume[t.ticker])&&(e.state.total_volume[t.ticker]=0),e.state.total_volume[t.ticker]+=t.volume,e.state.buy_volume[t.ticker]+=t.volume;a=e.state.stock_exchange[t.ticker];e.state.exchanges.map((function(e){e.name===a&&e.name===a&&(e.buy_volume+=t.volume)})),e.state.exchange_volume[a]+=t.volume,e.state.all_exchange_volume+=t.volume})),y.on("SELL",(function(t){var a=e.state.stock_exchange[t.ticker];isNaN(e.state.total_volume[t.ticker])&&(e.state.total_volume[t.ticker]=0),e.state.total_volume[t.ticker]+=t.volume,e.state.sell_volume[t.ticker]+=t.volume;a=e.state.stock_exchange[t.ticker];e.state.exchanges.map((function(e){e.name===a&&(e.sell_volume+=t.volume)})),e.state.exchange_volume[a]+=t.volume,e.state.all_exchange_volume+=t.volume}))}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"socket-control"},n.a.createElement("h2",null,"Tarea 3 - Taller de Integraci\xf3n"),n.a.createElement("button",{className:"button",onClick:this.control_socket},this.state.button_text)),this.state.exchanges.map((function(t){return n.a.createElement("div",{className:"exchange",key:t.name},n.a.createElement(x,{key:t.name,exchange:t,prueba:e.state.prueba,bigs:e.state.big_updates,smalls:e.state.small_updates,lasts:e.state.last_updates,volume:e.state.total_volume,total_volume:e.state.all_exchange_volume,buy_volume:e.state.buy_volume,sell_volume:e.state.sell_volume,exchange_volume:e.state.exchange_volume[t.name]}))})))}}]),a}(l.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[150,1,4]]]);
//# sourceMappingURL=main.ab8895f7.chunk.js.map