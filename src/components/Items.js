import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';


class Items extends Component {

  render() {
    return (
      <section>
        {
          this.props.itemsList.map((item) =>
            <Item
              key={item._id}
              itemData={item}
              handleDelete={this.props.handleDelete}
            />
          )
        }
      </section>
    );
  }
}

class Item extends Component {

  render() {
    const itemData = this.props.itemData;


    return (
      <Accordion>
        <Accordion.Item eventKey="{itemData._id}">
          <Accordion.Header>{itemData.name}</Accordion.Header>
            <Accordion.Body>
            {itemData.description}
              <div>
                <Button onClick={() => this.props.handleDelete(itemData)} data-testid={`delete-button-${itemData.name}`}>Delete Item</Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    );
  }
}

export default Items;
