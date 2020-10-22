import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {AddNewList, Button, List, Modal, ToggleSwitch} from 'components';

const COPY = {
    CLOSE_MODAL_BUTTON: 'Close',
    HORIZONTAL_VIEW: 'Horizontal view',
    VERTICAL_VIEW: 'Vertical view'
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            cards: {},
            listCardMapping: {},
            toggle: false,
            modalProps: null
        };

        this.createNewCard = this.createNewCard.bind(this);
        this.createNewList = this.createNewList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    createNewCard(card, listId) {
        let {cards, listCardMapping} = this.state;

        // listCardMapping = {
        //     listUniqueId1: [cardUniqueId1, cardUniqueId2, cardUniqueId3, cardUniqueId4],
        //     listUniqueId2: [cardUniqueId1, cardUniqueId2, cardUniqueId3]
        // }

        if (listCardMapping[listId]) {
            listCardMapping[listId].push(card.id);
        }
        else {
            listCardMapping[listId] = [card.id];
        }

        this.setState({
            cards: {
                ...cards,
                [card.id]: card
            },
            listCardMapping
        });
    }

    createNewList(list) {
        // lists = [{id: uniqueId1, name: 'List 1'}, {id: uniqueId2, name: 'List 2'}].. (chaqnged like below)
        // lists = {
        //     uniqueId1: {id: uniqueId1, name: 'List 1'},
        //     uniqueId2: {id: uniqueId2, name: 'List 2'}
        // }
        // list contains unique id and list name
        this.setState(({lists}) => ({
            lists: [...lists, list],
            modalProps: 'dummy'
        }));
    }

    deleteList(id) {
        // lists = [{id: uniqueId1, name: 'List 1'}, {id: uniqueId2, name: 'List 2'}...]
        // lists = {
        //     uniqueId1: {id: uniqueId1, name: 'List 1'},
        //     uniqueId2: {id: uniqueId2, name: 'List 2'}
        //     uniqueId3: {id: uniqueId2, name: 'List 3'}
        //     uniqueId4: {id: uniqueId2, name: 'List 4'}
        // }
        const {
            cards,
            listCardMapping: {[id]: deletedCardIds, ...otherListCardMapping},
            lists
        } = this.state,
        index = lists.findIndex(list => list.id === id);
        
        // Shallow copy the cards object
        const newCards = Object.assign({}, cards);
        deletedCardIds.map(cardId => delete newCards[cardId]);

        this.setState({
            cards: newCards,
            listCardMapping: otherListCardMapping,
            lists: [
                ...lists.slice(0, index),
                ...lists.slice(index + 1)
            ]
        });

        // this.setState(({lists}) => ({
        //     lists: lists.filter(list => list.id != id)
        // }));
    }

    getCards(listId) {
        const { cards, listCardMapping: {[listId]: cardIds} } = this.state;

        if (!cardIds) {
            return [];
        }

        return cardIds.map(cardId => cards[cardId]);
    }

    handleDragEnd(result) {
        // {
        //     "draggableId": "cebecc64-81b0-4de8-8a92-ae22bcc5c0b0",
        //     "type": "DEFAULT",
        //     "source": {
        //       "index": 0,
        //       "droppableId": "21e84e48-9004-4d25-bd91-52a3cd0f4101"
        //     },
        //     "reason": "DROP",
        //     "mode": "FLUID",
        //     "destination": {
        //       "droppableId": "9d8f0742-0b6f-4f15-a3cb-9249ffd7811b",
        //       "index": 0
        //     },
        //     "combine": null
        // }

        let {listCardMapping} = this.state;
        const {
            destination,
            draggableId,
            source: {index: sourceIndex, droppableId: sourceDroppableId}
        } = result;

        if (!destination) {
            return;
        }

        const {index: destinationIndex, droppableId: destinationDroppableId} = destination;

        if (
            sourceDroppableId === destinationDroppableId &&
            sourceIndex === destinationIndex
        ) {
            return;
        }

        if (
            sourceDroppableId === destinationDroppableId &&
            sourceIndex !== destinationIndex
        ) {
            const newCardIds = listCardMapping[sourceDroppableId];

            newCardIds.splice(sourceIndex, 1); // remove from existing array
            newCardIds.splice(destinationIndex, 0, draggableId); // re-add in the destination index with draggable id
            listCardMapping[sourceDroppableId] = newCardIds;
        } 
        else {
            const sourceCardIds = listCardMapping[sourceDroppableId],
                    destinationCardIds = listCardMapping[destinationDroppableId];

            sourceCardIds.splice(sourceIndex, 1);
            destinationCardIds.splice(destinationIndex, 0, draggableId);

            listCardMapping[sourceDroppableId] = sourceCardIds;
            listCardMapping[destinationDroppableId] = destinationCardIds;
        }

        this.setState({ listCardMapping });
    }

    handleModalClose() {
        this.setState({
            modalProps: null
        });
    }

    onToggle(event) {
        const {target: {checked: toggle}} = event;

        this.setState({toggle});
    }

    render () {
        const {lists, modalProps, toggle} = this.state;

        return (
            <React.Fragment>
                <DragDropContext onDragEnd = {this.handleDragEnd}>
                    <div className={toggle && "dynamic-list vertical" || "dynamic-list"}>
                        <ToggleSwitch onToggle={this.onToggle}>
                            {toggle && COPY.VERTICAL_VIEW || COPY.HORIZONTAL_VIEW}
                        </ToggleSwitch>
                        {
                            lists.map(list => (
                                <div key={list.id}>
                                    <List
                                        cards={this.getCards(list.id)}
                                        createNewCard={this.createNewCard}
                                        deleteList={this.deleteList}
                                        list={list}
                                    />
                                </div>
                            ))
                        }
                        <div>
                            <AddNewList createNewList={this.createNewList} />
                        </div>
                    </div>
                </DragDropContext>
                {
                    modalProps && (
                        <Modal>
                            <div>Modal Placeholder</div>
                            <Button
                                styleType="action"
                                onClick={this.handleModalClose}>
                                {COPY.CLOSE_MODAL_BUTTON}
                            </Button>
                        </Modal>
                    )
                }
            </React.Fragment>
        );
    }
}

export default Home;
