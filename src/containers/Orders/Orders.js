import React, { Component } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { setOrders, removeOrder } from '../../actions';
import { getOrders, deleteOrder } from '../../apiCalls';

class Orders extends Component {

  async componentDidMount() {
    try {
      const data = await getOrders()
        this.props.setOrders(data.orders)
    } catch (err) {
      console.error('Error fetching:', err)
    }
  }

  deleteOrder = (id) => {
      deleteOrder(id)
      this.props.removeOrder(id)
  }

  createOrderEls = () => {
    return this.props.orders.map(order => {
      return (
        <div data-testid="order" key={order.id} className="order">
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li key={ingredient}>{ingredient}</li>
            })}
          </ul>
          <button onClick={() => this.deleteOrder(order.id)}>x</button>
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
    setOrders: (orders) => dispatch(setOrders(orders)),
    removeOrder: (id) => dispatch(removeOrder(id)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
