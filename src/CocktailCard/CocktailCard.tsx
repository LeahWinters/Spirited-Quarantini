import React from "react";
import "./CocktailCard.scss";
import { Link } from 'react-router-dom';

export interface CocktailsCardProps {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const CocktailCard: React.SFC<CocktailsCardProps> = (props) => {

  return (
    <section className="cocktail-card">
      <h3 className='card-title'>{props.strDrink}</h3>
      <img 
        className="CC-img" 
        src={props.strDrinkThumb} 
        alt={props.strDrink} 
        />
      <Link to={`/cocktails/${props.idDrink}`}>
        <button className="cc-button" aria-label='details-button'>
          Make Me
        </button>
      </Link>
    </section>
  );
};

export default CocktailCard;
