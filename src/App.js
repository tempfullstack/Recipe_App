import React from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import Form from './components/Form.js';
import Recipes from './components/Recipes.js';

const API_KEY=process.env.REACT_APP_API_KEY;


class App extends React.Component {
  state = {
     recipes : []
  }
  getRecipe = async (e) =>{
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call= await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=9`);
    
    const data = await api_call.json();
    this.setState({recipes : data.recipes});
    console.log(this.state.recipes);
  }
  componentDidMount = () => {
    const json =localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes})
  }  
  componentDidUpdate = () =>{
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes",recipes);
  }
  render() {
    return (      
      <div className="App">
        <Navigation/>
        <div className="my-3">
          <Form getRecipe = {this.getRecipe}/>
          {/* similar to for loop */}
          <Recipes recipes={this.state.recipes}/>
        </div>         
      </div>      
    );
  }
}

export default App;
