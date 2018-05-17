import React from 'react';
import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAvspPHUto5dJbB_mVwB2MSqYx1gIyBsR0",
    authDomain: "hy-soloreactproject.firebaseapp.com",
    databaseURL: "https://hy-soloreactproject.firebaseio.com",
    projectId: "hy-soloreactproject",
    storageBucket: "hy-soloreactproject.appspot.com",
    messagingSenderId: "43778375421"
};
firebase.initializeApp(config);


class GroceryItem extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            item: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        // console.log(e.target.name);
        // console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount() {
        const dbRef = firebase.database().ref(`groceryList/${this.props.title}`);


        dbRef.on('value', (snapshot) => {
            // shows object (unique key), and value of foodItem, and completed false
            // console.log(snapshot.val());
            const data = snapshot.val();

            // empty array to push the data from teh for in loop that comes back from firebase
            const groceryListArray = [];

            // for in loop is used to enumerate through the data object that we've received back from firebase

            for (let item in data) {
                // unique key created by firebase
                // console.log(item);

                // gives back object associated with that unique key
                // console.log(data[item]);

                // data[item].key = item;

                groceryListArray.push(data[item]);
            }
        })

    }

    handleSubmit(e) {
        e.preventDefault();

        // const itemsClone = Array.from(this.state.items);
        
        // using state in component, creating a new object 
        const groceryList = {
            value: this.state.item,
            completed: false
        }

        const dbRef = firebase.database().ref(`groceryList/${this.props.title}`);

        dbRef.push(groceryList);

        // itemsClone.push(groceryList);

        this.setState({
            item: ''
        });
    }

    render() {

        return (
            <form action="" onSubmit={this.handleSubmit}>
                <h2>{this.props.title}</h2>
                <ul>
                    {this.state.items.map((foodItem) => {
                        // returns object with value of berry, completed false
                        // console.log(foodItem);
                        return <li>{foodItem.value}</li>
                    })}
                </ul>
                <div>
                    <input 
                    type="text" 
                    placeholder="What do you need to buy?" 
                    onChange={this.handleChange} 
                    name='item'
                    value={this.state.item}
                    />
                    <input type="submit" value="Add"/>
                </div>
            </form>
        )
    }
};

export default GroceryItem;