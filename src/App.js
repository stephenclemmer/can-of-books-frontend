import React from 'react';

import axios from 'axios';

import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Form from './components/AddItem.js';
import Items from './components/Items.js';
// import Accordion from 'react-bootstrap/Accordion'

const API_SERVER = process.env.REACT_APP_API;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
 
  // _______________________________
  // deleteItem = 



  // ________________________________
  addItem = async (item) => {
    try{
      const response = await axios.post(`${API_SERVER}/items`, item);
      const newItem = response.data;
      this.getItems();
        this.setState({
          items: [...this.state.items, newItem],
        });
      } catch (error) {
      console.log('error in book post: ', error.response);
    }
  }

  getItems = async () => {
    try {
      const response = await axios.get(`${API_SERVER}/items`);
      const items = response.data;
      this.setState({ 
      items: items
    });
   } catch (error) {
    console.log('we have an error: ', error.response);
   }  
  }


  async componentDidMount() {
    await this.getItems();
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">301 Final!</Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Row>
            <Col><h1>Our Items</h1></Col>
          </Row>
          <Row>
            <Col md="auto">
              <Form handleAddItem={this.addItem} />
            </Col>
            <Col>
              <Items itemsList={this.state.items} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
