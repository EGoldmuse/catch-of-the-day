import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const { params } = this.props.match;
        // First reeinstate local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }
    
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

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

    updateFish = (key, updatedFish) => {
        // take copy of current state of fishes
        const fishes = {...this.state.fishes};
        // 2. Upsdate that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        // 1. take a copy of state
        const fishes = { ...this.state.fishes };
        // 2. Update the state
        fishes[key] = null;
        // 3. Update state
        this.setState({ fishes });
    }
    
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = key => {
        // 1. Take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to order or update number in our order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({ order });
    };

    removeFish = (key) => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. Remove item from order
        delete order[key];
        // 3. Update state
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => 
                        <Fish 
                            key={key} 
                            index={key}
                            details={this.state.fishes[key]} 
                            addToOrder={this.addToOrder}/>
                        )}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFish={this.removeFish}
                />
                <Inventory 
                    addFish = {this.addFish} 
                    updateFish = {this.updateFish}
                    deleteFish = {this.deleteFish}
                    loadSampleFishes = {this.loadSampleFishes}
                    fishes = {this.state.fishes}
                    storeId = {this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;

