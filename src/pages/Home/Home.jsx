import React from 'react';
import {List, ToggleSwitch} from 'components';

const COPY = {
    HORIZONTAL_VIEW: 'Horizontal view',
    VERTICAL_VIEW: 'Vertical view'
};

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            horizontalView: false,
            lists: []
        };

        this.createNewList = this.createNewList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }

    createNewList(list) {
        // list contains unique id and list name
        this.setState(({lists}) => ({
            lists: [...lists, list]
        }));
    }

    deleteList(id) {
        const {lists} = this.state,
            index = lists.findIndex(list => list.id === id);

        this.setState({
            lists: [
                ...lists.slice(0, index),
                ...lists.slice(index + 1)
            ]
        });

        // this.setState(({lists}) => ({
        //     lists: lists.filter(list => list.id != id)
        // }));
    }

    onToggle(event) {
        const {target: {checked: horizontalView}} = event;

        this.setState({horizontalView});
    }

    render () {
        const {horizontalView, lists} = this.state;

        return (
            <div className={horizontalView && "dynamic-list horizontal" || "dynamic-list"}>
                <ToggleSwitch onToggle={this.onToggle}>
                    {horizontalView && COPY.HORIZONTAL_VIEW || COPY.VERTICAL_VIEW}
                </ToggleSwitch>
                {
                    lists.map(list => (
                        <div key={list.id}>
                            <List
                                deleteList={this.deleteList}
                                list={list}
                            />
                        </div>
                    ))
                }
                <div>
                    <List addNewList createNewList={this.createNewList} />
                </div>
            </div>
        );
    }
}

export default Home;
