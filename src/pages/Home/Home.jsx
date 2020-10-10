import React from 'react';
import {List} from 'components';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: []
        };

        this.createNewList = this.createNewList.bind(this);
        this.deleteList = this.deleteList.bind(this);
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

    render () {
        const {lists} = this.state;

        return (
            <div className="dynamic-list">
                {
                    lists.map(list => (
                        <List
                            deleteList={this.deleteList}
                            key={list.id}
                            list={list}
                        />
                    ))
                }
                <List addNewList createNewList={this.createNewList} />
            </div>
        );
    }
}

export default Home;
