import React from 'react';
import './Menu.css';
import MenuRow from '../MenuRow/MenuRow';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: ["play", "instructions"]
        }
    }

    render() {
        return (
            <div className='menu-wrapper'>
                {this.state.options.map((option, index) =>
                    <MenuRow key={option} label={option}
                        index={index}></MenuRow>
                )}
            </div>
        );
    }
}

export default Menu;