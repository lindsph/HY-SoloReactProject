import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import GroceryItem from './GroceryItem.js';

// Initialize Firebase
// const config = {
//   apiKey: "AIzaSyAvspPHUto5dJbB_mVwB2MSqYx1gIyBsR0",
//   authDomain: "hy-soloreactproject.firebaseapp.com",
//   databaseURL: "https://hy-soloreactproject.firebaseio.com",
//   projectId: "hy-soloreactproject",
//   storageBucket: "hy-soloreactproject.appspot.com",
//   messagingSenderId: "43778375421"
// };
// firebase.initializeApp(config);


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
            {/* use map to take from an array and onto JSX and on the page */}
            {this.state.listItems.map((groceryCategory, index) => {
              // getting groceryCategory from the map() thats happening
              // giving GroceryItem a property (title), which has a value of groceryCategory from map
              // pass that property into GroceryItem.js..
              return <GroceryItem title={groceryCategory} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
            })}
        </div>
      </div>
      // end of div.wrapper
    )
  }
  // end of render()
}




ReactDOM.render(<App />, document.getElementById('app'));
