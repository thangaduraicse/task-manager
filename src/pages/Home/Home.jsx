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
            toggle: false,
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
        const {target: {checked: toggle}} = event;

        this.setState({toggle});
    }

    render () {
        const {lists, toggle} = this.state;

        return (
            <div className={toggle && "dynamic-list vertical" || "dynamic-list"}>
                <ToggleSwitch onToggle={this.onToggle}>
                    {toggle && COPY.VERTICAL_VIEW || COPY.HORIZONTAL_VIEW}
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
                    <AddNewList createNewList={this.createNewList} />
                </div>
            </div>
        );
    }
}

export default Home;
