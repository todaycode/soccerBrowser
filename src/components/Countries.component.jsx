import styled from "styled-components";

import { Link, useParams } from "react-router-dom";

const CountriesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CountryContainer = styled.div`
  margin: 10px;
`;

const Countries = ({ countries }) => {
  const { counryCode } = useParams();
  return (
    <div>
      <CountriesContainer>
        {countries.map((c) => {
          return (
            <Link to={c.code}>
              <CountryContainer key={c.name}>
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
