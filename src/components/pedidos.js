import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import '../style/category.css';
import Food from '../components/food';
import Nav from './nav';
import querySearch from 'stringquery';

export const Pedidos = (props) => {

  const [pedido, setPedido ] = useState(props.state);
  const [pedidoId, setPedidoId] = useState([]);

  useEffect(() => {
    console.log('data pedido normal',pedido)
    getData();
  },[])

  // if(props.state.cart){
  //   setPedido(props.state.cart);
  // }

  const getData = async () => {
    let foodId = querySearch(window.location.search);
    try {
      const data = await axios.post(`${process.env.REACT_APP_BACK_END}/findfood`, foodId);
      console.log('data pedido',data.data.length)
      setPedidoId(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
    <Nav />
    <div>
      {
        pedidoId.length > 0 ?
        pedidoId.map((comidas, index) => {
          return comidas.order.map((comida, index) =>{
            return <Food type="feito" quantity={comida.quantity} img={comida.img} name={comida.name} time={comida.time} key={index} />
          })
        })
        : 
        props.state.length > 0 ?
          props.state.map((food, index) => {
          return <Food type="feito" quantity={food.quantity} idCart={index} img={food.img} name={food.name} time={food.time} key={index} />
        })
        :
        <span>Não temos nenhum pedido para exibir</span>
      }
    </div>
  </React.Fragment>
  )
}

export default Pedidos;
