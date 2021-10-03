import React from 'react'
import './App.css';

class App extends React.Component {
  // 1. Bagian menyimpan data state
  constructor(props) {
    super(props);
    this.state = {
      name: "Joe",
      age: "25"
    }
  }

  // 2. Bagian Function
  btnIncrement = () => {
    this.state.age++
    this.setState({ age: this.state.age })
  }

  // 3. Bagian render atau create component/page
  render() {

    setTimeout(() => {
      this.setState({ name: "Jo" })
    }, 5000);

    return (
      // Tempat membuat html
      <div>
        <h1>Hello, {this.state.name} {this.state.age}</h1>
        <h1>Welcome to ReactJS</h1>
        <button type="button" onClick={this.btnIncrement}>Age Increment</button>
      </div>
    );
  }
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

