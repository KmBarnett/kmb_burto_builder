
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import testingData from '../../testingData.js'

import { postOrder, getOrders } from '../../apiCalls';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

jest.mock('../../apiCalls');

const testStore = createStore(rootReducer);
function renderApp() {
  return render(
    <Provider store={testStore}>
        <App />
    </Provider>
  )
}
const testOrders = testingData.orders
const testOrder = testingData.testOrder
describe('App', () => {
  getOrders.mockResolvedValue({orders: testOrders})
  it('should render', async () => {
    const { getByText, getByPlaceholderText, getAllByTestId, debug } = renderApp()

    const nameInput = getByPlaceholderText('Name');
    const ingredients = getAllByTestId('ingredient');
    const orders = await waitFor(() => getAllByTestId('order'));

    expect(nameInput).toBeInTheDocument();
    expect(ingredients).toHaveLength(12);
    expect(orders).toHaveLength(3);
  });

  it('should be able to render a new order', async () => {
    postOrder.mockResolvedValue(testOrder)
    const { getByPlaceholderText, getByText, getAllByTestId, debug } = renderApp()
    const nameInput = getByPlaceholderText('Name')
    const ingredients = getAllByTestId('ingredient');
    const submit = getByText('Submit Order')


    fireEvent.change(nameInput, {target: {value: 'Lane'}});
    fireEvent.click(ingredients[0])
    fireEvent.click(ingredients[4])
    fireEvent.click(ingredients[2])
    fireEvent.click(ingredients[5])
    fireEvent.click(ingredients[9])


    const order = getByText('Order: beans, lettuce, carnitas, queso fresco, jalapenos')
    expect(order).toBeInTheDocument()
    debug()
    fireEvent.click(submit)
    debug()

    const newTicket =  await waitFor(() => getByText('Lane'))
    // const orders = await waitFor(() => getAllByTestId('order'));
    // expect(orders).toHaveLength(4);
    // expect(newTicket).toBeInTheDocument()
  });

})
