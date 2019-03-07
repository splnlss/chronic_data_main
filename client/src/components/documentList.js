import React from 'react';
import Card from './card';
import AddDocument from './addDocument';
import './dashboard.css';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
        this.addCard = this.addCard.bind(this);
    }

    addCard(text) {
        this.setState({
            cards: [...this.state.cards, {
                text
            }]
        });
    }

    render() {
        const cards = this.state.cards.map((card, index) =>
            <li key={index}>
                <Card {...card} />
            </li>
        );
        return (
            <main>
            <div>
                <h3>{this.props.title}</h3>
                <ul className="list">
                    {cards}
                    <li>
                        <AddDocument
                            type="card"
                            onAdd={text => this.addCard(text)}
                        />
                    </li>
                </ul>
            </div>
          </main>
        );
    }
}

List.defaultProps = {
    title: ''
};
