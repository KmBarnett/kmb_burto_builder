import * as actions from './index.js'
import testingData  from '../testingData.js'

// export const setOrders = orders => ({
//   type: 'SET_ORDERS',
//   orders
// });
//
// export const addOrder = order => ({
//   type: 'ADD_ORDER',
//   order
// });
const orders = testingData.orders

describe('Actions', () => {
  it('should have a type of SET_ORDERS and a correct payload', () => {

    const expectedAction = {
      type: 'SET_ORDERS',
      orders
    }
    const result = actions.setOrders(orders)
    expect(result).toEqual(expectedAction)
  });

  it('should have a type of ADD_ORDER and a correct payload', () => {

    const expectedAction = {
      type: 'ADD_ORDER',
      order: orders[0]
    }
    const result = actions.addOrder(orders[0])
    expect(result).toEqual(expectedAction)
  });

})
