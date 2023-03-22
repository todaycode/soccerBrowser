import styled from "styled-components";

import { Link } from "react-router-dom";

const CountriesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CountryContainer = styled.div`
  margin: 10px;
`;

const Countries = ({ countries }) => {
  console.log("Countries component rendered!");
  return (
    <div>
      <CountriesContainer>
        {countries.map((c) => {
          return (
            <Link to={c.code} key={c.name}>
              <CountryContainer>
                <img alt="Country Flag" src={c.flag} width="100px" />
                <p>{c.name}</p>
              </CountryContainer>
            </Link>
          );
        })}
      </CountriesContainer>
    </div>
  );
};

export default Countries;
