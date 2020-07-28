import React, { useState, useEffect } from "react";
import { getCocktailDetails } from "../apiCalls";
import { Cocktail } from "../Definitions/RandomCocktail";
import "./CocktailDetails.scss";

export interface CocktailDetailsProps {
  id: string;
	favCocktails: Cocktail[];
	madeCocktails: Cocktail[];
	setFavCocktails: Function;
	setMadeCocktails: Function;
	toggleUserInteraction: (idList: Cocktail[], drinkId: string, setTheSate: Function) => any;
}

const CocktailDetails: React.FC<CocktailDetailsProps> = ({ id, favCocktails, madeCocktails, setFavCocktails, setMadeCocktails,toggleUserInteraction }) => {
  const [cocktailInfo, setCocktailInfo] = useState<Cocktail>({
    idDrink: "",
    strDrink: "",
    strInstructions: "",
    strDrinkThumb: "",
  });
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean>(favCocktails.find(c => c.idDrink === id) ? true : false);
	const [isMade, setIsMade] = useState<boolean>(madeCocktails.find(c => c.idDrink === id) ? true : false);

  const getCocktail = async (): Promise<void> => {
    try {
      const data: Cocktail = await getCocktailDetails(id);
      setCocktailInfo(removeNulls(data));
    } catch (error) {
      setError(error.message);
    }
  };

  const removeNulls = (info: Cocktail): Cocktail => {
    const drinkDetails: Partial<Cocktail> = {
      idDrink: "",
      strDrink: "",
      strInstructions: "",
      strDrinkThumb: "",
    };
    (Object.keys(info) as Array<keyof Cocktail>).forEach((detail) => {
      if (info[detail] !== null) {
        drinkDetails[detail] = info[detail];
      }
    });
    return drinkDetails as Cocktail;
  };

  const displayIngredients = (endingIndex: number, givenKey: string): string[] => {
		console.log('fn entered', cocktailInfo)
		const cocktailIngredients = (Object.keys(cocktailInfo) as Array<keyof Cocktail>)
			.filter((keys) => keys.slice(0, endingIndex) === givenKey);
    return cocktailIngredients.map((i) => cocktailInfo[i] as string);
  };

  useEffect(() => {getCocktail()}, []);
	
	const clickHandler = (setTheState: Function, theState: boolean, idList: Cocktail[], updateProps: Function) => {
		setTheState(!theState);
    toggleUserInteraction(idList, id, updateProps);
  }

  return (
    <section className="cocktail-details-wrapper">
      <section className="cocktail-details-card">
        <h3>{cocktailInfo.strDrink}</h3>
        <img
          className="details-img"
          src={`${cocktailInfo.strDrinkThumb}`}
          alt={`${cocktailInfo.strDrink}`}
        />
        <section className="info-wrapper">
          <p className="detail-paragraph">
            <span className="sub-heading">Type: </span> {cocktailInfo.strCategory}
            , {cocktailInfo.strAlcoholic}
          </p>
          <p className="detail-paragraph">
            <span className="sub-heading">Glass: </span>
            {cocktailInfo.strGlass}
          </p>
          <h4>Instructions:</h4>
          <p>{cocktailInfo.strInstructions}</p>
          <span className="sub-heading">Ingredients:</span>
          <section className="ingredient-container">
            <ul>
              {displayIngredients(13, "strIngredient").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <ul className="ingr-measure-list">
              {displayIngredients(10, "strMeasure").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
					<section className='button-container'>
						{!isFavorite && (
							<button
								type="button"
								aria-label="add-to-favorites"
								onClick={() => clickHandler(setIsFavorite, isFavorite, favCocktails, setFavCocktails)}
							>
								Add to Favorites
							</button>
						)}
						{isFavorite && (
							<button
								type="button"
								aria-label="remove-from-favorites"
								onClick={() => clickHandler(setIsFavorite, isFavorite, favCocktails, setFavCocktails)}
							>
								Remove from Favorites
							</button>
						)}
						{!isMade && (
							<button
								type="button"
								aria-label="add-to-made"
								onClick={() => clickHandler(setIsMade, isMade, madeCocktails, setMadeCocktails)}
							>
								Mark as Made
							</button>
						)}
						{isMade && (
							<button
								type="button"
								aria-label="remove-from-made"
								onClick={() => clickHandler(setIsMade, isMade, madeCocktails, setMadeCocktails)}
							>
								Remove from Made
							</button>
						)}
					</section>
        </section>
      </section>
    </section>
  );
};

export default CocktailDetails;
