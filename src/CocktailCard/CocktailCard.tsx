import React from "react";
import "./CocktailCard.scss";

export interface CocktailsCardProps {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const CocktailCard: React.SFC<CocktailsCardProps> = (props) => {
  return (
    <section className="cocktail-card">
      <div className='card-title'>
        <h3>{props.strDrink}</h3>
        <button className="cc-button">Make Me!</button>
      </div>
      <img className="CC-img" src={props.strDrinkThumb} alt={props.strDrink} />
    </section>
  );
};

export default CocktailCard;
