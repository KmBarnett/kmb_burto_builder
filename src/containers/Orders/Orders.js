import React, { Component } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

class Orders extends Component {

  async componentDidMount() {
    try {
      const data = await getOrders()
        this.props.setOrders(data.orders)
    } catch (err) {
      console.error('Error fetching:', err)
    } 
  }

  createOrderEls = () => {
    return this.props.orders.map(order => {
      return (
        <div key={order.name} className="order">
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li key={ingredient}>{ingredient}</li>
            })}
          </ul>
        </div>
      )
    });
  }
  render() {
    return (
      <section>
        { this.createOrderEls().length ? this.createOrderEls() : <p>No orders yet!</p> }
      </section>
    )
  }
}

const mapStateToProps = ({ orders }) => ({
  orders
});

const mapDispatchToProps = dispatch => (
  {
    setOrders: (orders) => dispatch(setOrders(orders))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
