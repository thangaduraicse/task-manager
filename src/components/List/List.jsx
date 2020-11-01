import React from 'react';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import Button from '../Button/Button';
import Card from '../Card/Card';

const COPY = {
    ADD_NEW_CARD: 'Add new card...',
    DELETE_LIST: 'Delete this list'
};

class List extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddNewCard = this.handleAddNewCard.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
    }

    handleAddNewCard() {
        const {handleAddNewCard, list} = this.props;

        handleAddNewCard(list);
    }

    handleDeleteList() {
        const {deleteList, list: {id}} = this.props;

        deleteList(id);
    }

    render() {
        const {cards, list} = this.props;

        return (
            <article className="components-list">
                <div className="components-list-heading">
                    <p>{list.name}</p>
                    <Button
                        onClick={this.handleDeleteList}>
                        {COPY.DELETE_LIST}
                    </Button>
                </div>
                <Droppable droppableId={list.id}>
                    {
                        provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {cards.map((card, index) => <Card key={card.id} card={card} index={index} />)}
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
                <Button
                    styleType="action"
                    onClick={this.handleAddNewCard}>
                    {COPY.ADD_NEW_CARD}
                </Button>
            </article>
        );
    }
}

List.defaultProps = {
    cards: []
};

List.propTypes = {
    cards: PropTypes.array,
    deleteList: PropTypes.func.isRequired,
    handleAddNewCard: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired
};

export default List;
