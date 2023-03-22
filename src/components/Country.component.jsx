import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DataContext } from "../App";
import Leagues from "./Leagues.component";

const Country = (props) => {
  const { code } = useParams();
  const { countries, leagues } = useContext(DataContext);
  const country = countries.find((c) => c.code == code);
  const lgs = leagues.filter((le) => le.country.code == code);

  if (!country) return <h2>The country data not found!</h2>;
  return (
    <div>
      <Link to={`/countries/${code}`}>
        <img alt="Country Flag" src={country.flag} width="50px" />
        <p>{country.name}</p>
      </Link>
      <div>
        <Leagues leagues={lgs} />
      </div>
    </div>
  );
};

export default Country;
