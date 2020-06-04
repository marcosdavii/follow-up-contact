import React, { Component } from "react";
import DataService from "../services/client-service";


export default class Add extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSexo = this.onChangeSexo.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.newContact = this.newContact.bind(this);

        this.state = {
            id: null,
            name: "",
            sexo: "",
            phone: "",
            email: "",
            nameError: "",
            sexoError: "",
            phoneError: "",
            emailError: "",
            published: false,

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeSexo(e) {
        this.setState({
            sexo: e.target.value
        });
    };

    validate = () => {

        let nameError = "";
        let phoneError = "";
        let emailError = "";
        let sexoError = "";

        if (!this.state.name) {
            nameError = "Nome não pode ficar em branco"
        }
        if (!this.state.phone) {
            phoneError = "Contato não pode ficar em branco"
        }
        if (!this.state.sexo) {
            sexoError = "Sexo não pode ficar em branco"
        }
        if (!this.state.email) {
            emailError = "Email não pode ficar em branco"
        }
        if (!this.state.email.includes("@")) {
            emailError = "Email inválido";
        }
        if (emailError || nameError || phoneError || sexoError) {
            this.setState({ emailError, nameError, phoneError, sexoError });
            return false
        }
        return true;
    };

    saveContact() {
        var data = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            sexo: this.state.sexo,
        };
        const isValid = this.validate()
        if (isValid) {
            DataService.create(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        phone: response.data.phone,
                        sexo: response.data.sexo,
                        email: response.data.email,
                        published: response.data.published,

                        submitted: true
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    newContact() {
        this.setState({
            id: null,
            nome: "",
            phone: "",
            sexo: "",
            email: "",
            published: false,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Cadastro salvo com sucesso</h4>
                        <button className="btn btn-success" onClick={this.newContact}>
                            Adicionar
                        </button>
                    </div>
                ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    name="name"

                                />
                            </div>
                            <div style={{ marginTop: -15, fontSize: 10, color: "red" }}>
                                {this.state.nameError}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Contato</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    required
                                    value={this.state.phone}
                                    onChange={this.onChangePhone}
                                    name="phone"
                                />
                            </div>
                            <div style={{ marginTop: -15, fontSize: 10, color: "red" }}>
                                {this.state.phoneError}
                            </div>
                            <div className="form-group "  >
                                <label htmlFor="sexo">Genero</label>
                                <div className="input-group-prepend"> 
                                
                                    <select class="custom-select" id="sexo"  value={this.state.sexo}
                                    onChange={this.onChangeSexo} style={{ marginBottom: 15}}>
                                        <option selected>Escolha ...</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                    </select>
                                
                                </div>
                            </div>
                            <div style={{ marginTop: -15, fontSize: 10, color: "red" }}>
                                {this.state.sexoError}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    name="email"
                                />
                            </div>
                            <div style={{ marginTop: -15, fontSize: 10, color: "red" }}>
                                {this.state.emailError}
                            </div>

                            <button style={{ marginTop: 10 }} onClick={this.saveContact} className="btn btn-success">
                                Salvar
                        </button>
                        </div>
                    )}
            </div>
        );
    }
}