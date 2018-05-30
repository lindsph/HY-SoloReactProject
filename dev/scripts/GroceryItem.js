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
            checked: false,
            focused: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.focus = this.focus.bind(this);
    }

    handleChecked(e) {
        if(this.state.checked !== e.target.checked) {
            this.setState ({
                checked: e.target.checked
            });
        }
    }

    removeItem(keyToRemove) {
        window.setTimeout(() => {
            firebase.database().ref(`${this.props.userId}/groceryList/${this.props.title}/${keyToRemove}`).remove();
        }, 800)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    focus() {
        this.setState({
            focused : !this.state.focused
            })
    }

    componentDidMount() {
        this.input.addEventListener('focus', this.focus);
        this.input.addEventListener('blur', this.focus);

        this.dbRef = firebase.database().ref(`${this.props.userId}/groceryList/${this.props.title}`);



        this.dbRef.on('value', (snapshot) => {
            // shows object (unique key), and value of foodItem, and completed false
            // console.log(snapshot.val());
            const data = snapshot.val();
            // console.log(data);

            // empty array to push the data from teh for in loop that comes back from firebase
            const groceryListArray = [];

            // for in loop is used to enumerate through the data object that we've received back from firebase

            for (let item in data) {
                // unique key created by firebase
                // console.log(`key ${item}`);

                // gives back object associated with that unique key
                // console.log(data[item]);

                // gives back value associated with the object, ie: berry
                // console.log(data[item].value);

                // puts onto the object the key (unique firebase key)
                data[item].key = item;

                groceryListArray.push(data[item]);

                // gives back an array as the for in loop iterates through and adds the value from firebase of each object
                // console.log(groceryListArray)
            }
            
            this.setState({
                items: groceryListArray
            });
            // showing arrays for each category and items inside for those that have been submitted
            // console.log(this.state.items);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.handleSubmit.value);

        if (this.state.item === "") {
            swal({
                title: "Oops!",
                text: "You gooooottta enter something!",
                icon: "error",
                button: "Go back",
            });
        } else {

        const itemsClone = Array.from(this.state.items);
        
        // using state in component, creating a new object 
        const groceryList = {
            value: this.state.item,
        }
        const dbRef = firebase.database().ref(`${this.props.userId}/groceryList/${this.props.title}`);
        dbRef.push(groceryList);
        }
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
                        return (
                            <div 
                            className="groceryItem" 
                            key={foodItem.key}>
                                <input
                                type="checkbox"
                                name="completed"
                                className="checkbox"
                                id="check"
                                onChange={() => this.removeItem(foodItem.key) }
                                />
                                <label htmlFor="check"></label>
                                <li>{foodItem.value}</li>
                            </div>
                        )
                    })}
                </ul>
                <div className="inputField">
                    <input 
                    className="input-focused"
                    ref={input => this.input = input}
                    className={['input', this.state.focused && 'input-focused'].join(' ')}
                    type="text" 
                    autoComplete="off"
                    onChange={this.handleChange} 
                    name='item'
                    value={this.state.item}
                    />
                    <button className="add"><i className="fas fa-plus"></i></button>
                </div>
            </form>
        )
    }
};

export default GroceryItem;