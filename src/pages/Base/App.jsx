import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div>This is personal task manager</div>
                <div>Added</div>
                <div>Added 5</div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
