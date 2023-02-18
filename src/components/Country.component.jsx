import { useParams } from "react-router-dom";

const Country = (props) => {
  const { countryCode } = useParams();
  return (
    <div>
      <img alt="Country Flag" src={props.flag} width="100px" />
      <p>{countryCode}</p>
    </div>
  );
};

export default Country;
