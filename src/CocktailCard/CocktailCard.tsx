import React from 'react';
import './CocktailCard.scss';

export interface CocktailsCardProps {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

const CocktailCard: React.SFC<CocktailsCardProps> = (props) => {
  return (
    <section className="cocktail-card">
      <h3 className="card-title">{props.strDrink}</h3>
      <img className='CC-img' src={props.strDrinkThumb} alt={props.strDrink} />
      <button className='cc-button'>Make Me!</button>
    </section>
  )
}

export default CocktailCard;
