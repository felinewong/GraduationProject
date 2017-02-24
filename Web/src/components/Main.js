require('normalize.css/normalize.css');
require('styles/App.css');
import React from 'react';
import {NavItem,Nav,NavDropdown,MenuItem} from 'react-bootstrap';



var GalleryByReactApp = React.createClass({
   handleSelect(eventKey) {
    event.preventDefault();
    alert(`selected ${eventKey}`);
  },

  render() {
    return (
      <header className="header">
        <a href="index.html" className="logo" />
        <Nav bsStyle="pills" bsClass="navbar navbar-static-top" role="navigation" >
          <NavItem eventKey="1" href="/home">NavItem 1 content</NavItem>
          <NavItem eventKey="2" title="Item">NavItem 2 content</NavItem>
        </Nav>
      </header>
    );
  }
}); 

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
