import React from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div>This is personal task manager</div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
