import { orders } from './orders';
import testingData from '../testingData.js'

const ordersData = testingData.orders

describe('categories Reducer', () => {
  it('should return the initial state', () => {
    const expectedResult = [];
    const result = orders(undefined, {})
    expect(result).toEqual(expectedResult)
  });

  it('when receiving SET_ORDERS, should set orders', () => {
    const action = {
      type: 'SET_ORDERS',
      orders: ordersData
    }
    const expectedResult = ordersData
    const result = orders([], action)
    expect(result).toEqual(expectedResult)

  });

  it('when receiving ADD_ORDER, should set orders', () => {
    const ordersData = testingData.orders
    const action = {
      type: 'ADD_ORDER',
      order: ordersData[0]
    }
    const expectedResult = [...ordersData, ordersData[0]]
    const result = orders(ordersData, action)
    expect(result).toEqual(expectedResult)
  });

})
