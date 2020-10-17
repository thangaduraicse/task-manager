import React from 'react';
import {AddNewList, List, ToggleSwitch} from 'components';

const COPY = {
    HORIZONTAL_VIEW: 'Horizontal view',
    VERTICAL_VIEW: 'Vertical view'
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: {},
            cards: [],
            listCardMapping: {},
            toggle: false,
        };

        this.createNewCard = this.createNewCard.bind(this);
        this.createNewList = this.createNewList.bind(this);
        this.deleteList = this.deleteList.bind(this);
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
            lists: {
                ...lists,
                [list.id]: list
            }
        }));
    }

    deleteList(id) {
        // lists = [{id: uniqueId1, name: 'List 1'}, {id: uniqueId2, name: 'List 2'}...]
        // const {lists} = this.state,
        //     index = lists.findIndex(list => list.id === id);

        // this.setState({
        //     lists: [
        //         ...lists.slice(0, index),
        //         ...lists.slice(index + 1)
        //     ]
        // });

        // this.setState(({lists}) => ({
        //     lists: lists.filter(list => list.id != id)
        // }));

        // lists = {
        //     uniqueId1: {id: uniqueId1, name: 'List 1'},
        //     uniqueId2: {id: uniqueId2, name: 'List 2'}
        //     uniqueId3: {id: uniqueId2, name: 'List 3'}
        //     uniqueId4: {id: uniqueId2, name: 'List 4'}
        // }

        // Removing Object Properties with Destructuring
        let {
            cards,
            lists: { [id]: omitList, ...otherLists },
            listCardMapping
        } = this.state;

        if(listCardMapping[id]) {
            cards = cards.filter(card => !listCardMapping[id].includes(card.id));
        }

        const { [id]: omitListCardMapping, ...otherListCardMapping } = listCardMapping;

        this.setState({
            cards,
            lists: otherLists,
            listCardMapping: otherListCardMapping
        });
    }

    getCards(listId) {
        const { cards, listCardMapping } = this.state;

        if (!listCardMapping[listId]) {
            return [];
        }

        return cards.filter(card => listCardMapping[listId].includes(card.id));
    }

    onToggle(event) {
        const {target: {checked: toggle}} = event;

        this.setState({toggle});
    }

    render () {
        const {lists, toggle} = this.state;

        console.log('this.state <Home /> 108:', this.state);

        return (
            <div className={toggle && "dynamic-list vertical" || "dynamic-list"}>
                <ToggleSwitch onToggle={this.onToggle}>
                    {toggle && COPY.VERTICAL_VIEW || COPY.HORIZONTAL_VIEW}
                </ToggleSwitch>
                {
                    Object.entries(lists).map(([listId, list]) => (
                        <div key={listId}>
                            <List
                                cards={this.getCards(listId)}
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
        );
    }
}

export default Home;
