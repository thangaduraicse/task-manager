import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {AddNewList, List, ToggleSwitch} from 'components';

const COPY = {
    HORIZONTAL_VIEW: 'Horizontal view',
    VERTICAL_VIEW: 'Vertical view'
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            cards: [],
            listCardMapping: {},
            toggle: false,
        };

        this.createNewCard = this.createNewCard.bind(this);
        this.createNewList = this.createNewList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragUpdate = this.handleDragUpdate.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
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
            cards: [...cards, card],
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
            lists: [...lists, list]
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
            listCardMapping: {[id]: deletedListCardMapping, ...otherListCardMapping},
            lists
        } = this.state,
        index = lists.findIndex(list => list.id === id);

        this.setState({
            cards: deletedListCardMapping
                && cards.filter(({id}) => deletedListCardMapping.includes(id)) || cards,
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
        const { cards, listCardMapping } = this.state;

        if (!listCardMapping[listId]) {
            return [];
        }

        return cards.filter(card => listCardMapping[listId].includes(card.id));
    }

    handleDragStart(result) {
        console.log('On Drag Start: Result - ', result);
    }

    handleDragUpdate(result) {
        console.log('On Drag Update: Result - ', result);
    }

    handleDragEnd(result) {
        console.log('On Drag End: Result - ', result);
    }

    onToggle(event) {
        const {target: {checked: toggle}} = event;

        this.setState({toggle});
    }

    render () {
        const {lists, toggle} = this.state;

        console.log('this.state <Home /> 108:', this.state);

        return (
            <DragDropContext
                onDragStart = {this.handleDragStart}
                onDragUpdate = {this.handleDragUpdate}
                onDragEnd = {this.handleDragEnd}
            >
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
        );
    }
}

export default Home;
