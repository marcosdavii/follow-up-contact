import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import Add from "./components/add.component";
import Contact from "./components/contact.component";
import List from "./components/list.component";
import Calender from "./components/calender"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/contacts" className="navbar-brand">
              AdmContatos
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to={"/contacts"} className="nav-link">
                Contatos
              </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Adicionar
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/calender"} className="nav-link">
                  Agenda
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
                <Switch>
                  <Route exact path={["/", "/contacts"]} component={List} />
                  <Route exact path="/add" component={Add} />
                  <Route exact path="/contact/:id" component={Contact} />
                  <Route exact path="/calender" component={Calender} />
                </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
