import { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class Items extends Component {

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.handleDeleteItem(this.state.formData)
  // }


  handleDelete = async (itemToDelete) => {
    try {
    
      const response = await axios.delete(`${process.env.REACT_APP_API}/items/${itemToDelete.id}`);
      console.log(response.status);
      const filteredItems = this.state.items.filter( item => {
        return item.id !== itemToDelete.id;
      })
      this.setState({
        item: filteredItems
      })

    } catch (error) {
      console.log(error);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.handleAddItem(this.state.formData)
  }

  render() {

    return (
      <section>
        <h2>Items...</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.itemsList.map((item, idx) =>
                <Item key={item._id} itemData={item} />
              )
            }
          </tbody>
        </Table>


      </section>
    );
  }
}

class Item extends Component {

  render() {

    const itemData = this.props.itemData;

    return (
      <tr>
        <td>{itemData.name}</td>
        <td>{itemData.description}</td>
        <td>
          <Button onClick={() => this.handleDelete} data-testid={`delete-button-${itemData.name}`}>Delete Item</Button>
        </td>
      </tr>
    );
  }
}

export default Items;
