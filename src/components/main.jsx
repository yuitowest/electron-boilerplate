import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar fixedTop fluid inverse brand="example">
          <Nav>
            <LinkContainer to="/p1"><NavItem>Page1</NavItem></LinkContainer>
            <LinkContainer to="/p2"><NavItem>Page2</NavItem></LinkContainer>
          </Nav>
        </Navbar>
        <div className="container">
          <div className="starter-template">
          {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

class Page1 extends React.Component {
  render() {
    return (
      <div>
        <h2>Page1</h2>
      </div>
    );
  }
}

class Page2 extends React.Component {
  render() {
    return (
      <div>
        <h2>Page2</h2>
      </div>
    );
  }
}

export class Main extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App}>
          {/* <IndexRoute component={} /> */}
          <Route path="p1" component={Page1} />
          <Route path="p2" component={Page2} />
        </Route>
      </Router>
    );
  }
}
