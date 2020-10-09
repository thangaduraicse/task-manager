import React from 'react';
import {List} from 'components';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: {}
        };

        this.createNewList = this.createNewList.bind(this);
    }

    createNewList({listName}) {
        this.setState(prevState => ({
            lists: {
                ...prevState.list,
                [listName]: []
            }
        }));
    }

    render () {
        const {lists} = this.state;

        return (
            <React.Fragment>
                {
                    Object.entries(lists).map(([listName, listEntries]) => (
                        <List key={listName} name={listName} entries={listEntries} />
                    ))
                }
                <List addNewList createNewList={this.createNewList} />
            </React.Fragment>
        );
    }
}

export default Home;
