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
      <div>
        <header>
          <div className="hero">
            <div className="titleBackground"></div>
            <h1>All out of</h1>
          </div>
          <div className="login">
            <h3><a href="#">Log In</a></h3>
          </div>
        </header>
        <main>
          <div className="wrapper">
              {this.state.listItems.map((groceryCategory, index) => {
                return <GroceryItem 
                title={groceryCategory} 
                handleSubmit={this.handleSubmit} 
                handleChange={this.handleChange}/>
              })}
          </div>
          {/* end of div.wrapper */}
        </main>
      </div>
      // end of wrapping div
    )
  }
  // end of render()
}
ReactDOM.render(<App />, document.getElementById('app'));
