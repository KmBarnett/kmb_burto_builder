import React, { Component } from 'react';
import { postOrder } from '../../apiCalls';
import { addOrder } from '../../actions';
import { connect } from 'react-redux';


class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    const { ingredients } = this.state;
    e.preventDefault();
    this.setState({ingredients: [...ingredients, e.target.name]});
  }

  handleSubmit = e => {
    e.preventDefault();
    postOrder(this.state)
      .then(data => this.props.addOrder(data))

    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const { ingredients, name } = this.state;
    const isFilledOut = ingredients.length && name;
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button  data-testid="ingredient" key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

        <button disabled={!isFilledOut} onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    addOrder: (order) => dispatch(addOrder(order))
  }
);

export default connect(null, mapDispatchToProps)(OrderForm);
