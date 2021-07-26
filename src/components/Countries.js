import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [rangeValue, setRangeValue] = useState(40);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    // Vue que la requete se lance à l'infini on fait une condition
    if (playOnce) {
      axios
        .get(
          "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag"
        )
        .then((res) => {
          setData(res.data);
          // C'est à appel les data qu'une seule fois et tu arretes
          setPlayOnce(false);
        });
    }

    const sortedCountry = () => {
      // On transforme le tableau en objet
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        // tri décroissant
        return b.population - a.population;
      });
      sortedArray.length = rangeValue;
      setSortedData(sortedArray);
    };

    sortedCountry();
  }, [data, rangeValue, playOnce]);

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <ul>
          {radios.map((radio) => {
            // sans ce map on allé faire des input pour le s5 continent
            return (
              <li key={radio}>
                <input
                  type="radio"
                  value={radio}
                  id={radio}
                  checked={radio === selectedRadio}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cancel">
        {selectedRadio && (
          <h5 onClick={() => setSelectedRadio("")}>Annuler recherche</h5>
        )}
      </div>
      <ul className="countries-list">
        {data
          .filter((country) => country.region.includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .filter((country, index) => index < rangeValue)
          .map((country) => (
            <Card country={country} key={country.name} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
