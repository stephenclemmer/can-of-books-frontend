import React from 'react';
import axios from 'axios';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Items from './components/Items.js';
import AddNewItem from './components/AddItem.js';

const API_SERVER = process.env.REACT_APP_API;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
 

  handleDelete = async (itemToDelete) => {
    try {
      const response = await axios.delete(`${API_SERVER}/items/${itemToDelete._id}`);
      console.log(response.status);
      const filteredItems = this.state.items.filter( item => {
        return item._id !== itemToDelete._id;
      })
      this.setState({
        item: filteredItems
      })
      this.getItems();

    } catch (error) {
      console.log(error);
    }
  }


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
        <Container>
          <AddNewItem 
            addItem={this.addItem}
          />
        </Container>

        <Container fluid>
          <Row>
            <Col><h1>Our Items</h1></Col>
          </Row>
          <Row>
            <Col md="auto">
            </Col>
            <Col>
              <Items 
              itemsList={this.state.items} 
              handleDelete={this.handleDelete}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
