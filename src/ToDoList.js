import React from 'react';
import axios from 'axios';

const URL = "http://localhost:2001"
class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // property
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
        axios.get(`${URL}/ToDo`)
            .then((response) => {
                console.log(response.data)
                this.setState({ dbToDo: response.data })
            }).catch((error) => {
                console.log(error)
            })
    }

    printToDo = () => {
        //     let htmlElement = this.state.dbToDo.map((value, index) => {
        //         return(
        //             <tr>
        //                 <th>{index+1}</th>
        //                 <td>{value.kegiatan}</td>
        //                 <td>{value.detail}</td>
        //                 <td><button type="button">Delete</button></td>
        //             </tr>
        //         )
        //     })
        //     return htmlElement
        // }
        return this.state.dbToDo.map((value, index) => {
            if (this.state.selectedId == value.id) {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <td><input type="text" defaultValue={value.kegiatan} ref="editKegiatan" /></td>
                        <td><input type="text" defaultValue={value.detail} ref="editDetail" /></td>
                        <td><button type="button" onClick={this.btnCancel}>Cancel</button>
                            <button type="button" onClick={this.btnSave}>Save</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <td>{value.kegiatan}</td>
                        <td>{value.detail}</td>
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
        let kegiatan = this.refs.editKegiatan.value
        let detail = this.refs.editDetail.value

        axios.patch(`${URL}/ToDo/${this.state.selectedId}`, {
            kegiatan,
            detail
        }).then((response) => {
            // get data ulang
            this.getData()
            this.setState({ selectedId: null })
        }).catch((error) => {
            console.log(error)
        })

        // let temp = [...this.state.dbToDo]
        // temp[this.state.selectedIndex].kegiatan = this.refs.editKegiatan.value
        // temp[this.state.selectedIndex].detail = this.refs.editDetail.value
        // this.setState({
        //     dbToDo: temp,
        //     selectedIndex: null
        // })
        // cara 2
        // this.state.dbToDo[this.state.selectedIndex].kegiatan = this.refs.editKegiatan.value
        // this.state.dbToDo[this.state.selectedIndex].detail = this.refs.editDetail.value
        // this.setState({dbToDo:this.state.dbToDo})
    }

    btnEdit = (id) => {
        // memperbarui data pada state = this.setState({property : data})
        this.setState({ selectedId: id })
    }

    btnDelete = (id) => {
        axios.delete(`${URL}/ToDo/${id}`)
            .then((response) => {
                this.getData()
            }).catch((error) => {
                console.log(error)
            })

        // let temp = [...this.state.dbToDo]
        // temp.splice(idx, 1)
        // this.setState({ dbToDo: temp })
    }

    btnAdd = () => {
        let kegiatan = this.refs.addKegiatan.value;
        let detail = this.refs.addDetail.value;

        axios.post(`${URL}/ToDo`, {
            kegiatan,
            detail
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
            <div style={{ width: "70vw", margin: "auto", border: "1px solid gray", overflow:"auto" }}>
                <h1 style={{ textAlign: "center" }}>ToDoList</h1>
                <table style={{ margin: "auto" }}>
                    <thead>
                        <th>No.</th>
                        <th>Kegiatan</th>
                        <th>Detail</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.printToDo()}
                    </tbody>
                    <tfoot>
                        <th>#</th>
                        <th><input type="text" placeholder="Kegiatan Baru" ref="addKegiatan"></input></th>
                        <th><input type="text" placeholder="Detail Baru" ref="addDetail"></input></th>
                        <th><button type="button" onClick={this.btnAdd}>Add</button></th>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default ToDoList;