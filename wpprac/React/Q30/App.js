import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { id: Date.now(), name: newItem, purchased: false }]);
      setNewItem('');
    }
  };

  const togglePurchased = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Grocery List</h1>
        <div className="input-section">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add grocery item..."
          />
          <button onClick={addItem}>Add Item</button>
        </div>
        <ul className="grocery-list">
          {items.length === 0 ? (
            <li className="empty">No items in your list. Add some groceries!</li>
          ) : (
            items.map(item => (
              <li key={item.id} className={item.purchased ? 'purchased' : ''}>
                <span onClick={() => togglePurchased(item.id)}>
                  {item.name}
                </span>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;


