import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    addFish = fish => {
        // 1. Tale a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set new fishes object to state
        // typically we would first declare which state to update and the variable to which we are updating, 
        // since the state and updated value are named the same we can use one word here, fishes
        this.setState({ fishes });
    };
    loadSampleFishes = () => {
        alert("Loading sample");
    };
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory 
                    addFish = {this.addFish} 
                    loadSampleFishes = {this.loadSamplefishes}
                />
            </div>
        )
    }
}

export default App;