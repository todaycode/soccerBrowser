import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../App";
// import styled from "styled-components";
import { getFixturesByLeagueId } from "../utils";
import Fixture from "./Fixture.component";

const League = (props) => {
  const { id } = useParams();
  const { leagues } = useContext(DataContext);
  const [fixtures, setFixtures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ldata = leagues.find((l) => l.league.id === +id);
  useEffect(() => {
    let getFixtures = async () => {
      let fxs = await getFixturesByLeagueId(id, 2022);
      console.log(fxs);
      if (fxs.length) {
        setFixtures(fxs);
        setIsLoading(false);
      }
    };
    getFixtures();
  }, [id]);

  if (!ldata) return <h2>Can't find League data!</h2>;
  return (
    <>
      <div>
        <img
          alt="League Mark"
          src={ldata.league.logo}
          width="100px"
          style={{ background: "white" }}
        />
        <p>{ldata.league.name}</p>
        <p>
          {ldata.country.flag && (
            <img alt="Country Flag" src={ldata.country.flag} width="20px" />
          )}
          {ldata.country.name}
        </p>
        <small>Type: {ldata.league.type}</small>
      </div>
      {isLoading ? (
        <h2>Loading Fixtures...</h2>
      ) : (
        <div>
          {fixtures.map((f) => (
            <Fixture key={f.fixture.id} fixture={f} />
          ))}
        </div>
      )}
    </>
  );
};

export default League;
