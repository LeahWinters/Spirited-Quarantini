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
			<section className='img-container'>
				<Link to={`/${props.idDrink}/details`}><button className="cc-button">Make Me</button></Link>
				<img className="CC-img" src={props.strDrinkThumb} alt={props.strDrink} />
			</section>
    </section>
  );
};

export default CocktailCard;
