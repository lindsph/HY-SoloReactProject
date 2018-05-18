import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import GroceryItem from './GroceryItem.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: ['Fruits', 'Vegetables', 'Canned Goods', 'Frozen Foods', 'Meat And Fish', 'Spices', 'Condiments', 'Sauces And Oils', 'Snacks', 'Breads', 'Dairy', 'Pet Items', 'Household Items', 'Toiletries', 'Oh Yeah, And']
    };
  }

  render() {
    return (
      <div className="wrapper">
        <h1>All out of</h1>
        <div>
            {this.state.listItems.map((groceryCategory, index) => {
              return <GroceryItem 
              title={groceryCategory} 
              handleSubmit={this.handleSubmit} 
              handleChange={this.handleChange}/>
            })}
        </div>
      </div>
      // end of div.wrapper
    )
  }
  // end of render()
}
ReactDOM.render(<App />, document.getElementById('app'));
