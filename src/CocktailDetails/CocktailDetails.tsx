import React, { useState, useEffect } from "react";
import { getCocktailDetails } from "../apiCalls";
import { Cocktail } from "../Definitions/RandomCocktail";
import "./CocktailDetails.scss";

export interface CocktailDetailsProps {
  id: string;
  toggleFavorites: (id: string) => any;
  favCocktails: string[];
}

const CocktailDetails: React.FC<CocktailDetailsProps> = ({ id, toggleFavorites, favCocktails }) => {
  const [cocktailInfo, setCocktailInfo] = useState<Cocktail>({
    idDrink: "",
    strDrink: "",
    strInstructions: "",
    strDrinkThumb: "",
  });
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favCocktails.includes(id)
  );

  const getCocktail = async (): Promise<any> => {
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

  const displayIngredients = (
    endingIndex: number,
    givenKey: string
  ): string[] => {
    const cocktailIngredients = (Object.keys(cocktailInfo) as Array<
      keyof Cocktail
    >).filter((keys) => keys.slice(0, endingIndex) === givenKey);
    return cocktailIngredients.map((i) => cocktailInfo[i] as string);
  };

  useEffect(() => {
    getCocktail();
  }, []);
	//modify lint file?
	
	const clickHandler = () => {
		setIsFavorite(!isFavorite)
		toggleFavorites(id)
	}

  return (
    <section className="cocktail-details-wrapper">
      <section className="cocktail-details-card">
        <h3>{cocktailInfo.strDrink}</h3>
        <img
          className="COTD-img"
          src={`${cocktailInfo.strDrinkThumb}`}
          alt={`${cocktailInfo.strDrink}`}
        />
        <section className="info-wrapper">
          <p className="detail-paragraph">
            <div className="sub-heading">Type: </div> {cocktailInfo.strCategory}
            , {cocktailInfo.strAlcoholic}
          </p>
          <p className="detail-paragraph">
            <div className="sub-heading">Glass: </div>
            {cocktailInfo.strGlass}
          </p>
          <h4>Instructions:</h4>
          <p>{cocktailInfo.strInstructions}</p>
          <div className="sub-heading">Ingredients:</div>
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
          {!isFavorite && (
            <button
              type="button"
              aria-label="add-to-favorites"
              onClick={() => clickHandler()}
            >
              Add to Favorites
            </button>
          )}
          {isFavorite && (
            <button
              type="button"
              aria-label="add-to-favorites"
              onClick={() => clickHandler()}
            >
              Remove from Favorites
            </button>
          )}
        </section>
      </section>
    </section>
  );
};

export default CocktailDetails;
