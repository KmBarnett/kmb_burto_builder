import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderForm from './OrderForm';
import testingData from '../../testingData.js'

import { postOrder } from '../../apiCalls';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

jest.mock('../../apiCalls');

const testStore = createStore(rootReducer);
function renderOrderForm() {
  return render(
    <Provider store={testStore}>
        <OrderForm />
    </Provider>
  )
}
const testOrder = testingData.orders[0]
describe('OrderForm', () => {
  postOrder.mockResolvedValue(testOrder)
  it('should render', () => {
    const { getByPlaceholderText, getAllByTestId } = renderOrderForm()

    const nameInput = getByPlaceholderText('Name')
    const ingredients = getAllByTestId('ingredient')

    expect(nameInput).toBeInTheDocument()
    expect(ingredients).toHaveLength(12);
  });

  it('should be able to order', () => {
    const { getByPlaceholderText, getByText } = renderOrderForm()
    const nameInput = getByPlaceholderText('Name')
    const beans = getByText('beans')
    const lettuce = getByText('lettuce')
    const carnitas = getByText('carnitas')
    const quesoFresco = getByText('queso fresco')
    const jalapenos = getByText('jalapenos')
    const submit = getByText('Submit Order')

    fireEvent.change(nameInput, {target: {value: 'Pat'}});
    fireEvent.click(beans)
    fireEvent.click(lettuce)
    fireEvent.click(carnitas)
    fireEvent.click(quesoFresco)
    fireEvent.click(jalapenos)

    const order = getByText('Order: beans, lettuce, carnitas, queso fresco, jalapenos')
    expect(order).toBeInTheDocument()

    fireEvent.click(submit)

    expect(postOrder).toHaveBeenCalled()
    expect(postOrder).toHaveBeenCalledWith({name:testOrder.name, ingredients: testOrder.ingredients})
  });

})
