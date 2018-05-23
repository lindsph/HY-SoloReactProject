import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import GroceryItem from './GroceryItem.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: ['Fruits', 'Vegetables', 'Canned Goods', 'Frozen Foods', 'Meat And Fish', 'Spices', 'Condiments', 'Sauces And Oils', 'Snacks', 'Breads', 'Dairy', 'Pet Items', 'Household Items', 'Toiletries', 'Oh Yeah, And'],
      loggedIn: false,
      data: ""
    };
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref(`groceryList/${this.props.title}`);

    firebase.auth().onAuthStateChanged((user) => {
      if(user !== null) {
        this.dbRef.on('value', (snapshot) => {
          const data = snapshot.val();
          this.setState({
            data: data
          });
        });
        this.setState({
          loggedIn: true
        });
      }
      // end of if
      else {
        this.setState({
          loggedIn: false
        });
      }
    })
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        // console.log(user);
      })
      .catch((error) => {
        // console.log(error);
      })
  }

  logout() {
    firebase.auth().signOut();
    // console.log('signed out');
    this.dbRef.off();
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
            {this.state.loggedIn === false ? <button onClick={this.loginWithGoogle}>Login with Google</button> : null}
            {this.state.loggedIn === true ? <button onClick={this.logout}>Logout</button> : null}
          </div>
        </header>
        {this.state.loggedIn === true ? 
        <main>
          <div className="wrapper">
              {this.state.listItems.map((groceryCategory, index) => {
                return <GroceryItem 
                title={groceryCategory} 
                handleSubmit={this.handleSubmit} 
                handleChange={this.handleChange}
                data={this.state.data} />
              })}
          </div>
          {/* end of div.wrapper */}
        </main>
        : null }
      </div>
      // end of wrapping div
    )
  }
  // end of render()
}
ReactDOM.render(<App />, document.getElementById('app'));
