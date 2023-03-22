import { Link } from "react-router-dom";
import styled from "styled-components";

const LeaguesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
`;

const LeagueContainer = styled(Link)`
  margin: 10px;
  padding: 20px;
  background: black;
  color: white;
  text-decoration: none;
`;

const Leagues = ({ leagues }) => {
  return (
    <div>
      <LeaguesContainer>
        {leagues.map((data) => {
          return (
            <LeagueContainer
              key={data.league.id}
              to={`/leagues/${data.league.id}`}
            >
              <img
                alt="League Mark"
                src={data.league.logo}
                width="100px"
                style={{ background: "white" }}
              />
              <p>{data.league.name}</p>
              <p>
                {data.country.flag && (
                  <img
                    alt="Country Flag"
                    src={data.country.flag}
                    width="20px"
                  />
                )}
                {data.country.name}
              </p>
              <small>Type: {data.league.type}</small>
            </LeagueContainer>
          );
        })}
      </LeaguesContainer>
    </div>
  );
};

export default Leagues;
