// import {styled} from 'styled-components'

const Team = ({ team }) => (
  <div style={{ width: "150px" }}>
    <img alt="Home Team" src={team.logo} width="30px" />
    <p>{team.name}</p>
  </div>
);

const Fixture = ({ fixture }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex" }}>
        <Team team={fixture.teams.home} />
        <Team team={fixture.teams.away} />
      </div>
      <p>
        {fixture.fixture.date.substr(0, 16)}-{fixture.fixture.status.long}
      </p>
    </div>
  );
};

export default Fixture;
