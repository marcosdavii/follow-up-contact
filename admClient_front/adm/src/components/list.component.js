import React, { Component } from "react";
import DataService from "../services/client-service";
import { Card, Button } from "@material-ui/core";


export default class List extends Component {
    constructor(props) {
        super(props);
        this.retrieveContact = this.retrieveContact.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveContact = this.setActiveContact.bind(this);

        this.state = {
            contact: [],
            currentContact: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveContact();
    }

    retrieveContact() {
        DataService.getAll()
            .then(response => {
                this.setState({
                    contact: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveContact();
        this.setState({
            currentContact: null,
            currenrIndex: -1
        });
    }

    setActiveContact(contact, index) {
        this.setState({
            currentContact: contact,
            currenrIndex: index
        });
    }


    render() {
        const { contact, currentContact, currentIndex } = this.state;

        return (
            <div className="list row">
                
                <div className="col-md-6">
                    <h4>Lista de Contatos</h4>

                    <ul className="list-group">
                        {contact && 
                        contact.map((contact, index) => (
                            <li
                                className={
                                    "list-group-item" +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveContact(contact, index)}
                                key={index}
                            >
                                {contact.name}
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentContact ? (
                        <div>
                            <Card style={{ padding: 10 }}>
                            <h4>Contato</h4>
                            <div>
                                <label>
                                    <strong>Nome</strong>
                                </label>{" "}
                                {currentContact.name}
                            </div>
                        <div>
                            <label>
                                <strong>Telefone</strong>
                            </label>{" "}
                            {currentContact.phone}
                        </div>
                        <div>
                            <label>
                                <strong>Email</strong>
                            </label>{" "}
                            {currentContact.email}
                        </div>
                        
                        <div>
                            <label>
                                <strong>Genero</strong>
                            </label>{" "}
                            {currentContact.sexo}
                        </div>
                      
                        <Button href={"/contact/" + currentContact.id}
                        className="btn btn-warning" style={{ background: '#F8C321' }}
                        >
                            Editar
                        </Button>
                        
                        </Card>
                    </div>
                    ) : (
                        <div>
                            <br />
                            <p>Por favor click em um Contato</p>
                        </div>
                    )}
                </div>
              </div>      
            //... list
        );
    }
}