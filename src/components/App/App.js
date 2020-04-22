import React from 'react';
import './App.css';
import Orders from '../../containers/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

function App() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>
        <Orders />
      </main>
    );
}

export default App;
