import React from "react";
import axios from 'axios';

const URL = "http://localhost:2001"
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbToDo: [],
            selectedIndex: null
        }
    }

    componentDidMount() {
        this.getData()
    }
    // function
    // fungsi untuk get data ke API
    // .then((callbackfunction)=>{}) : berisi respon data jika berhasil
    // .catch((callbackfunction)=>{}) : berisi respon error karena gagal
    getData = () => {
        axios.get(`${URL}/users`)
            .then((response) => {
                console.log(response.data)
                this.setState({ dbToDo: response.data })
            }).catch((error) => {
                console.log(error)
            })
    }

    printUsers = () => {
        return this.state.dbToDo.map((value, index) => {
            if (this.state.selectedId == value.id) {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <td><input type="text" defaultValue={value.name} ref="editName" /></td>
                        <td><input type="text" defaultValue={value.email} ref="editEmail" /></td>
                        <td><input type="text" defaultValue={value.password} ref="editPassword" /></td>
                        <td><button type="button" onClick={this.btnCancel}>Cancel</button>
                            <button type="button" onClick={this.btnSave}>Save</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.password}</td>
                        <td>{value.role}</td>
                        <td><button type="button" onClick={() => this.btnDelete(value.id)}>Delete</button>
                            <button type="button" onClick={() => this.btnEdit(value.id)}>Edit</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    btnCancel = () => {
        this.setState({ selectedId: null })
    }

    btnSave = () => {
        let name = this.refs.editName.value
        let email = this.refs.editEmail.value
        let password = this.refs.editPassword.value

        axios.patch(`${URL}/users/${this.state.selectedId}`, {
            name,
            email,
            password
        }).then((response) => {
            // get data ulang
            this.getData()
            this.setState({ selectedId: null })
        }).catch((error) => {
            console.log(error)
        })
    }

    btnEdit = (id) => {
        // memperbarui data pada state = this.setState({property : data})
        this.setState({ selectedId: id })
    }

    btnDelete = (id) => {
        axios.delete(`${URL}/users/${id}`)
            .then((response) => {
                this.getData()
            }).catch((error) => {
                console.log(error)
            })

        // let temp = [...this.state.dbToDo]
        // temp.splice(idx, 1)
        // this.setState({ dbToDo: temp })
    }

    btnSubmit = () => {
        let name = this.refs.addName.value;
        let email = this.refs.addEmail.value;
        let password = this.refs.addPassword.value;
        let role = "user"
        axios.post(`${URL}/users`, {
            name,
            email,
            password,
            role
        }).then((response) => {
            // get data ulang
            this.getData()
        }).catch((error) => {
            console.log(error)
        })
        // method untuk menyimpan pada state
        // let temp = [...this.state.dbToDo];

        // temp.push({ kegiatan, detail });

        // this.setState({ dbToDo: temp });
    }

    render() {
        return (
            <React.Fragment>
                <form style={{ paddingTop: "2.5vw" }}>
                    <div className="form-inner" style={{ boxShadow: "1px 3px", width: "20vw", height: "20vw", margin: "auto", border: "1px solid ", overflow: "auto", paddingLeft: "3.5vw", paddingTop: "2.5vw" }}>
                        <h4>Login</h4>
                        <div className="form-group" style={{ padding: "1px 2px" }}>
                            <input type="text" placeholder="Enter Your Name" ref="addName" />
                        </div>
                        <div className="form-group" style={{ padding: "1px 2px" }}>
                            <input type="text" placeholder="Enter Your email" ref="addEmail" />
                        </div>
                        <div className="form-group" style={{ padding: "1px 2px" }}>
                            <input type="text" placeholder="Enter Your Password" ref="addPassword" />
                        </div>
                        <button className="btn btn-success btn-sm" type="submit" onClick={this.btnSubmit}>Submit</button>
                    </div>
                </form>
                <div style={{ width: "70vw", margin: "auto", border: "1px solid gray", overflow: "auto", marginTop: "5vw" }}>
                    <h2>User List</h2>
                    <table style={{ margin: "auto" }}>
                        <thead>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {this.printUsers()}
                        </tbody>
                        <tfoot>
                                
                        </tfoot>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;