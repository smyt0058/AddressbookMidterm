import ReactDOM from 'react-dom';
import React from 'react';
import {contacts} from './data/contacts';

let state = {};

function calAge(dob = '1900-01-01 00:00:01'){
    let date = new Date(Date.now() - new Date(dob).getTime());
    return Math.abs(date.getUTCFullYear() - 1970);
}

class ContactDetail extends React.Component {
    render() {
        if (!this.props.item) {
            return (
                <div className='contactDetails'>
                    <p>Click on a Contact to the left to view details</p>
                </div>
            );
        } else {
            return (
                <div className='contactDetails'>
                    <h1>{this.props.item.name.first} {this.props.item.name.last}</h1>
                    <div>
                        <img src={this.props.item.picture.large} alt=''/>
                    </div>
                    <div className='dob'>
                        <p><b>D.O.B:</b> {this.props.item.dob} | {calAge(this.props.item.dob)} years old</p>
                    </div>
                    <div className='info'>
                        <p><b>Email:</b> {this.props.item.email}</p>
                        <p><b>Phone:</b> {this.props.item.phone}</p>
                    </div>
                </div>
            );
        }
    }
}

class ContactList extends React.Component {
    render() {
        return (
            <div>
                <li>
                    <a href={'#/contact/' + this.props.id}>
                        <ul className="individual">
                            <li><img src={this.props.picture.thumbnail} alt=''/></li>
                            <li><p>{this.props.name.first} {this.props.name.last}</p></li>
                            <li><p>{this.props.dob}</p></li>
                        </ul>
                    </a>
                </li>
            </div>
        );
    }
}

//On hash change
window.addEventListener('hashchange', ()=>setState({location: location.hash}));

function setState(changes){
    state = Object.assign({}, state, changes);
    
    let item;
    let location = state.location.replace(/^#\/?|\/$/g, '').split('/');
    
    //Routing
    if (location[0] === 'contact' ){
        item = state.items.find(item => item.id == location[1] ? true : false);
    }
    
    const mainDiv = (
        <div className='wrap'>
           <div className='list'>
               <ul>{state.items.map (item => <ContactList {...item}/>)}</ul>
            </div>
            <ContactDetail item={item} />
        </div>
    ); 
    
    ReactDOM.render(mainDiv, document.getElementById('react-app'));
}

//Initial State
setState({
    items: contacts,
    location: location.hash
});