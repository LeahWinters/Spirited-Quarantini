import React from "react";
import "./CocktailCard.scss";
import { Link } from 'react-router-dom'

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
      <Link to={`/${props.idDrink}/details`}><img className="CC-img" src={props.strDrinkThumb} alt={props.strDrink} /></Link>
    </section>
  );
};

export default CocktailCard;
