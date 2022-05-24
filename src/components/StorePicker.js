import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from "../helpers"

class StorePicker extends React.Component {
    myInput = React.createRef();
    static propTypes = {
        history: PropTypes.object
    }
    goToStore = e => {
        // 1. Stop the form form submitting
        e.preventDefault();
        // 2. Get the text from that input
        const storeName = this.myInput.current.value
        // 3. Change the page to /store/whatever-was-entered
        this.props.history.push(`/store/${storeName}`)
    }
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a store</h2>
                <input type="text" 
                    ref={this.myInput}
                    required 
                    placeholder="Store Name" 
                    defaultValue ={getFunName()}/>
                <button type="submit">Visit Store →</button>
            </form>
        );
    }
}

export default StorePicker;