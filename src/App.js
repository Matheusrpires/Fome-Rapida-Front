import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppContext from "../src/context/AppContext";
import './App.css';
import './style/home.css';
import Category from './components/category';
import Itens from './components/itens';
import Orders from './components/orders';
import Nav from './components/nav';
import Cart from './components/cart';
import './App.css';
import './style/home.css'
import testeImg from './style/img/category/foodiesfeed.com_neapolitan-pizza-margherita.jpg'
import Kitchen from './components/Kitchen/Dashboard';

class App extends Component {

  state = {
    cart: [],
    cartQ: 0,
    valueOrder: 0,
  }

  pizzas = [{
    img: testeImg,
    category: "pizza",
    name: "mussarela",
    price: 100,
    time: "30"
  },{
    img: testeImg,
    category: "pizza",
    name: "pizza2",
    price: 10,
    time: "30"
  },{
    img: testeImg,
    category: "pizza",
    name: "pizza3",
    price: 200,
    time: "30"
  },{
    img: testeImg,
    category: "pizza",
    name: "pizza4",
    price: 60,
    time: "30"
  },{
    img: testeImg,
    category: "pizza2",
    name: "pizza5",
    price: 120,
    time: "30"
  },{
    img: testeImg,
    category: "pizza2",
    name: "pizza6",
    price: 200,
    time: "30"
  },{
    img: testeImg,
    category: "pizza3",
    name: "pizza7",
    price: 900,
    time: "30"
  },{
    img: testeImg,
    category: "pizza3",
    name: "pizza8",
    price: 700,
    time: "30"
  },
]

  handleCart = (value) => {
    realizando: [{ numPedido: 50, mesa: 10, item: "teste", quantidade: 50 }, { numPedido: 70, mesa: 15, item: "teste", quantidade: 80 }, { numPedido: 90, mesa: 18, item: "teste", quantidade: 90 }, { numPedido: 49, mesa: 50, item: "teste", quantidade: 500 }],
    pedidos: [
      {
        numPedido: 50,
        mesa: 10,
        itens: [{ product: "teste", quantidade: 50, tempo: "1:15", tempoRestante: "1:15", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "1:15", tempoRestante: "1:15", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "0:05", tempoRestante: "0:05", status: 'realizando' }],
        ItensConcluidos: 0,
        statusPedido: 'realizado',
        tempoTotalInicial: '1:15',
        tempoTotalRestante: '1:15',
      },

      {
        numPedido: 56,
        mesa: 19,
        itens: [{ product: "teste", quantidade: 80, tempo: "0:03", tempoRestante: "0:03", status: 'realizando' }, { product: "teste", quantidade: 50, tempo: "0:09", tempoRestante: "0:09", status: 'realizando' }],
        ItensConcluidos: 0,
        statusPedido: 'realizado',
        tempoTotalInicial: '0:09',
        tempoTotalRestante: '0:09',
      }],
  }

  handleCart(value) {
    let carts = this.state.cart;
    carts.push(value);
    this.setState({
      cart: carts,
      cartQ: carts.length
    })
  }

  alterStateTempoRestante = (tipo, pedido, item, tempo) => {
    const state = { ...this.state };
    switch (tipo) {
      case 'item':
        state.pedidos[pedido].itens[item].tempoRestante = tempo.join(':');
        break;
      case 'pedido':
        state.pedidos[pedido].tempoTotalRestante = tempo.join(':');
        break;
      default:
        console.log('deu muito ruim')
    }
    this.setState(state);
  }

  alterStateAtrasado = (tipo, pedido, item) => {
    const state = { ...this.state };
    switch (tipo) {
      case 'item':
        state.pedidos[pedido].itens[item].status = 'atrasado';
        break;
      case 'pedido':
        state.pedidos[pedido].statusPedido = 'atrasado';
        break;
      default:
        console.log('Deu muito ruim cara ;_:');
    }
    this.setState(state);
  }

  alterStateConcluido = (Indexpedido, item) => {
    const state = { ...this.state };

    state.pedidos[Indexpedido].itens[item].status = 'concluido';

    if (state.pedidos[Indexpedido].ItensConcluidos === 0) {
      state.pedidos[Indexpedido].ItensConcluidos = 1;
      this.setState(state);
    } else {
      state.pedidos[Indexpedido].ItensConcluidos = state.pedidos[Indexpedido].ItensConcluidos + 1;
      this.setState(state);
    }
    this.verifyStatus(Indexpedido);
  }

  verifyStatus = (Indexpedido) => {

    if (this.state.pedidos[Indexpedido].itens.length === this.state.pedidos[Indexpedido].ItensConcluidos) {
      this.state.pedidos[Indexpedido].statusPedido = 'concluido';
    }

  }

  counterLis = () => {
    let cardActiveTablesCounter = document.querySelectorAll('div.cards.active-tables > div.list > ul > li').length;
    let cardRightCounter = document.querySelectorAll('div.cards.right > div.list > ul > li').length;
    let cardLateCounter = document.querySelectorAll('div.cards.late > div.list > ul > li').length;
    let cardCompletedCounter = document.querySelectorAll('div.cards.completed > div.list > ul > li').length;

    let cardActiveTablesElement = document.querySelector("#root > div > section > div.cards.active-tables > div.title > h3:nth-child(2)");
    let cardRightElement = document.querySelector("#root > div > section > div.cards.right > div.title > h3:nth-child(2)");
    let cardLateElement = document.querySelector("#root > div > section > div.cards.late > div.title > h3:nth-child(2)");
    let cardCompletedElement = document.querySelector("#root > div > section > div.cards.completed > div.title > h3:nth-child(2)");

    cardActiveTablesElement.innerText = cardActiveTablesCounter;
    cardRightElement.innerHTML = cardRightCounter;
    cardLateElement.innerHTML = cardLateCounter;
    cardCompletedElement.innerHTML = cardCompletedCounter;
  }

  render() {
    const contextValues = {
      state: this.state,
      alterStateAtrasado: this.alterStateAtrasado,
      alterStateConcluido: this.alterStateConcluido,
      alterStateTempoRestante: this.alterStateTempoRestante,
      counterLis: this.counterLis
    }

    return (
      <div>
        <div className="App wrapper">
          <Nav cart={this.state.cart} />
          {/* <Home /> */}
          <Switch>
            <Route exact path='/category' render={() => <Category data={this.pizzas}/>} />
            <Route path='/category/itens' render={(props) => <Itens {...props} data={this.pizzas} cartHandler={this.handleCart} />} />
            <Route path='/orders' render={() => <Orders orders={this.state.cart} />} />
            <Route exact path='/Kitchen' component={Kitchen} />
            {/* <Route exact path='/' render={() => <Home changeState={this.changeState} api={this.callApi} data={this.state.allPlants} />} /> */}
          </Switch>
          <Cart cart={this.state.cart} cartSize={this.state.cartQ} />
        </div>
      </div>
    );
  }
}

export default App;
