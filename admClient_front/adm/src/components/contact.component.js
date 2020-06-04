import React, { Component } from "react";
import DataService from "../services/client-service";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeSexo = this.onChangeSexo.bind(this);
    this.getContact = this.getContact.bind(this);
    this.updatePublished = this.updatePublished.bind(this)
    this.updateContact = this.updateContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);

    this.state = {
      currentContact: {
        id: null,
        name: "",
        email: "",
        phone: "",
        sexo: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getContact(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentContact: {
          ...prevState.currentContact,
          name: name
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        email: email
      }
    }));
  }


  onChangePhone(e) {
    const phone = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        phone: phone
      }
    }));
  }

  onChangeSexo(e) {
    const sexo = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        sexo: sexo
      }
    }));
  }


  getContact(id) {
    DataService.get(id)
      .then(response => {
        this.setState({
          currentContact: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentContact.id,
      name: this.state.currentContact.name,
      email: this.state.currentContact.email,
      phone: this.state.currentContact.phone,
      sexo: this.state.currentContact.sexo,
      published: status
    };

    DataService.update(this.state.currentContact.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentContact: {
            ...prevState.currentContact,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateContact() {
    DataService.update(
      this.state.currentContact.id,
      this.state.currentContact
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Contato atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteContact() {
    DataService.delete(this.state.currentContact.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/contacts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentContact } = this.state;

    return (
      <div>
        {currentContact ? (
          <div className="edit-form">
            <h4>Contato</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentContact.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentContact.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Contato</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentContact.phone}
                  onChange={this.onChangePhone}
                />
              </div>
              <div className="form-group ">
                <label htmlFor="sexo">Genero</label>
                <div className="input-group-prepend">
                    <select class="custom-select" id="sexo" value={currentContact.sexo}
                      onChange={this.onChangeSexo} style={{ marginBottom: 15 }}>
                      <option selected>Escolha ...</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </select>
                 
                </div>
              </div>

              {/*  <div className="form-group">
                <label htmlFor="service">Sexo</label>
                <input
                  type="text"
                  className="form-control"
                  id="service"
                  value={currentContact.sexo}
                  onChange={this.onChangeSexo}
                />
              </div>
               */}

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentContact.published ? " Ativo" : " Inativo"}
              </div>
            </form>

            {currentContact.published ? (
              <button style={{ marginRight: 3 }}
                className="btn btn-outline-primary"
                onClick={() => this.updatePublished(false)}
              >
                Inativo
              </button>
            ) : (
                <button style={{ marginRight: 3 }}
                  className="btn btn-outline-primary"
                  onClick={() => this.updatePublished(true)}
                >
                  Ativo
                </button>
              )}

            <button style={{ marginRight: 3 }}
              className="btn btn-outline-danger"
              onClick={this.deleteContact}
            >
              Deletar
            </button>

            <button style={{ marginRight: 3 }}
              type="submit"
              className="btn btn-outline-success"
              onClick={this.updateContact}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
            <div>
              <br />
              <p>Por Favor click em um Contato...</p>
            </div>
          )}
      </div>
    );
  }
}
