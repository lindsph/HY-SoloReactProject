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
          <div className="arrow">
            <svg id="more-arrows">
              <polygon className="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 " />
              <polygon className="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 " />
              <polygon className="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 " />
            </svg>
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
