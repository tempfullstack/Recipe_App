import React from "react";
import { Link } from "react-router-dom";

class Recipe extends React.Component {
  state = {
    activeRecipe: []
  };
  componentDidMount = async () => {
    const recipeId = this.props.location.state.recipe;
    const req = await fetch(
      `http://localhost:8080/recipes/${recipeId}`
    );

    const res = await req.json();
    this.setState({ activeRecipe: res.recipe });
    console.log(this.state.activeRecipe);
  };
  render() {
    const recipe = this.state.activeRecipe;
    return (
      <div className="container mt-3">
        {this.state.activeRecipe.length !== 0 && (
          <div className="active-recipe">
            <img
              className="active-recipe__img"
              src={recipe.image_url}
              alt={recipe.title}
            />
            <h3 className="active-recipe__title">{recipe.title}</h3>
            <h4 className="active-recipe__publisher">
              Publisher: <span> {recipe.publisher} </span>
            </h4>
            <p className="active-recipe__website">
              Website:{" "}
              <span>
                <a href={recipe.source_url}>{recipe.publisher_url}</a>
              </span>
            </p>
            <button className="active-recipe__button">
              <Link to="/">Go Home</Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Recipe;
