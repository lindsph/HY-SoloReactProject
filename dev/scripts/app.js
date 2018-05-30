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
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref(`${this.state.userId}/groceryList/${this.props.title}`);

    firebase.auth().onAuthStateChanged((user) => {

      if(user !== null) {
        this.dbRef.on('value', (snapshot) => {
          const data = snapshot.val();
          this.setState({
            data: data
          });
        });
        this.setState({
          userId: user.uid,
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false,
          userId: ''
        });
      }
    })
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        console.log(user.user.uid);
        const userInfo = user.user.uid;
        this.setState({
          userId: userInfo
        });
      })
      .catch((error) => {
        return error;
      })
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>

        {this.state.loggedIn === false ? 
        <header>
          <div className="hero">
            <h1>All out of</h1>
          </div>
          <div className="login">
            <button className="loginButton" onClick={this.loginWithGoogle}>Login with Google</button>
          </div>
        </header>
          : null}

        {this.state.loggedIn === true ? 
        <main>
          <button className="logoutButton" onClick={this.logout}>Logout</button>
          <h3>Add items to your grocery list</h3>
          <div className="border"></div>
          <div className="wrapper">
              {this.state.listItems.map((groceryCategory, index) => {
                return <GroceryItem 
                title={groceryCategory} 
                data={this.state.data} 
                userId={this.state.userId}/>
              })}
          </div>
        </main>
        : null }

      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
