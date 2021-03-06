import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/cart.css';
import Abtn from '../style/styled/btn_ball';
import cart from '../style/img/icons/cart.png';

class Cart extends Component {

  state = {
    cart: this.props.orders,
    items: 0,
    price: 0,
    quantity: 0,
    step: false,
  }

  cartRef = React.createRef();
  cartBtn = React.createRef()

  componentDidUpdate(prevState, prevProps) {
    // console.log('prevstate', prevState.orders)
    // console.log('prevstate', prevState.orders.length)
    // console.log(prevProps)
    // console.log(prevState.orders.length)
    // console.log(prevProps.items)
    let quantity = prevState.orders.map(item => {
      return item.quantity;
    })
    quantity = quantity.reduce((acc, total) => {
      return acc + total;
    })
    if (prevProps.quantity !== quantity) {
      this.setState({
        quantity: quantity
      })
    }
    if (prevProps.items !== prevState.orders.length) {
      this.setState({
        items: prevState.orders.length
      })
      this.handleTeste()
    }
  }

  handleTeste = () => {
    console.log('orders', this.props.orders)
    const array = this.props.orders.map(item => {
      return item.price * item.quantity;
    })

    console.log('priceeee', array);
    const price = array.reduce((acc, total) => {
      // console.log('accPrice',acc)
      // console.log('total',total)
      return acc + total;
    })
    // console.log('price',price)
    this.setState({
      price: price
    })
  }

  handleCart = () => {
    // const cart = this.cartRef.current;
    // console.log(cart.getBoundingClientRect());
    // console.log(cart.getBoundingClientRect().height);
    // console.log(getComputedStyle(cart).marginBottom);
    // // const value = -40;
    // // cart.style.margin = `0px 0px ${value}px 0px` ;
    // cart.classList.toggle('cart__opened');
    // this.setState({
    //   marg: 0
    // })
    // console.log(cart.classList[1])
    // if (cart.classList[1]) {
    //   this.setState({
    //     marg: this.state.oldMarg        
    //   })
    // }
    if(this.state.cart.length >= 1){
      const cartBtn = this.cartBtn.current;
      if (cartBtn.classList.value === 'up') {
        cartBtn.classList.value = 'down';
      } else {
        cartBtn.classList.value = 'up';
      }
      if (!this.state.step) {
        this.setState({
          step: true
        })
      } else {
        this.setState({
          step: false
        })
      }
    }

  }

  handleClick = () => {
    const cart = this.cartRef.current;
    console.log(cart.getBoundingClientRect());
    console.log(cart.getBoundingClientRect().height);
    console.log(cart.style.color);


    // const value = this.state.oldMarg + 20;
    this.setState({
      // marg: value,
      // oldMarg: value
      step: true
    })
    // cart.style.margin = `0px 0px ${value}px 0px` ;

  }

  handlePayM = () => {
    this.props.handlePay();
    this.props.sendOrder();
  }

  render() {
    const styles = {
      // "margin-bottom": "0px"
    }

    const styleWrapper = {
      // "margin": `0px 0px -${this.state.marg * 20}px 0px`
    }

    // const itemStyle = {
    //   "padding": "10px 0px",
    //   "fontSize": "20px"
    //   padding: 10px 0px;
    // font-size: 20px;
    // display: flex;
    // justify-content: space-evenly;
    // }

    const transitionOptions = {
      transitionName: "fade",
      // mountOnEnter: 500,
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500

    }

    return (
      <div ref={this.cartRef} className="cart__wrapper" style={styleWrapper}>
        <div className="cart__remuseWrapper">
          <div>
            <span className="cart__resume">Resumo do carrinho</span>
          </div>
          <Abtn onClick={() => this.handleCart()} >
            <i ref={this.cartBtn} className="up"></i>
          </Abtn>
          <div>
            <a className="cart__price">R$ {this.props.state.price},00</a>
          </div>
        </div>
        <div className="cart__closed">
          {
            this.state.step ?
            this.props.state.cart.map((item, index) => {
              return <div className="itemStyle" key={index}>
                <span class="cart__items">{item.name}</span>
                <span class="cart__items">Q:{item.quantity}</span>
                <span class="cart__items">R${item.price},00</span>
              </div>
            })
            :
            <span className="cart_span">Seu carrinho está vazio</span>
          }
          {
            this.state.step &&
            <div className="cart__paymentwrapper">
              <Link className="cart__paymentbtn" to={'/pagamento'}>Pagamento</Link>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Cart;