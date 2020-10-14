import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import Card from '../Card/Card';

const COPY = {
    ADD_NEW_CARD: 'Add new card...',
    DELETE_LIST: 'Delete this list'
};

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 1,
            cards: []
        };

        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.handleAddNewCard = this.handleAddNewCard.bind(this);
    }

    handleAddNewCard() {
        this.setState(({cards, count}) => {
            const cardObj = {
                id: uuidv4(),
                title: `Card ${count}`
            };

            return ({
                cards: [...cards, cardObj],
                count: count + 1
            });
        });
    }

    handleDeleteList() {
        const {deleteList, list: {id}} = this.props;

        deleteList(id);
    }

    render() {
        const {list} = this.props,
            {cards} = this.state;

        return (
            <article className="components-list">
                <div className="components-list-heading">
                    <p>{list.name}</p>
                    <Button
                        onClick={this.handleDeleteList}>
                        {COPY.DELETE_LIST}
                    </Button>
                </div>
                {cards.map(card => <Card key={card.id} title={card.title} />)}
                <Button
                    styleType="action"
                    onClick={this.handleAddNewCard}>
                    {COPY.ADD_NEW_CARD}
                </Button>
            </article>
        )
    }
}

List.propTypes = {
    deleteList: PropTypes.func,
    list: PropTypes.object
};

export default List;
