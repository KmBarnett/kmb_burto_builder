export const getOrders = async () => {
  const response = await fetch('http://localhost:3001/api/v1/orders')
  return await response.json()
}

export const postOrder = async (order) => {
  const options = {
    method: 'POST',
    headers: {
            'Content-Type': 'application/json'
           },
    body: JSON.stringify(order)
  }
  const response = await fetch('http://localhost:3001/api/v1/orders', options)
  return await response.json()
}

export const deleteOrder = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
            'Content-Type': 'application/json'
           },
  }
  const response = await fetch(`http://localhost:3001/api/v1/orders/${id}`, options)
}
