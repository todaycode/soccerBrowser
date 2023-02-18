import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Fuse from "fuse.js";
import Countries from "./components/Countries.component";
import Leagues from "./components/Leagues.component";

import "./styles.css";
import { getCountries, getLeagues } from "./utils";
import Country from "./components/Country.component";
export default function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res.response);
      setFilteredCountries(res.response);
    });
    getLeagues().then((res) => {
      setLeagues(res.response);
      setFilteredLeagues(res.response);
      console.log(res);
    });
  }, []);

  const onSearchStrChange = (e) => {
    setSearchStr(e.target.value);
    if (!e.target.value) {
      setFilteredCountries(countries);
      setFilteredLeagues(leagues);
    } else {
      const optionsForCountries = {
        includeScore: true,
        ignoreLocation: true,
        keys: ["name"]
      };
      const fuseForCountries = new Fuse(countries, optionsForCountries);
      const resultForCountries = fuseForCountries.search(
        searchStr ? searchStr : " "
      );
      setFilteredCountries(resultForCountries.map((c) => c.item));
      const optionsForLeagues = {
        includeScore: true,
        ignoreLocation: true,
        keys: ["league.name", "country.name"]
      };
      const fuseForLeagues = new Fuse(leagues, optionsForLeagues);
      const resultForLeagues = fuseForLeagues.search(
        searchStr ? searchStr : " "
      );
      setFilteredLeagues(resultForLeagues.map((c) => c.item));
    }
  };
  return (
    <Router>
      <div className="App">
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <li>
            <Link to="/countries">Countries</Link>
          </li>
          <li>
            <Link to="/leagues">Leagues</Link>
          </li>
          <li>
            <Link to="/fixtures">Fixtures</Link>
          </li>
        </ul>
        <input value={searchStr} onChange={onSearchStrChange} />
        <p>
          {filteredCountries.length} - {filteredLeagues.length}
        </p>
        <Routes>
          <Route
            path="/countries"
            element={<Countries countries={filteredCountries} />}
          />
          <Route path="/countries/:countryCode" element={<Country />} />
          <Route
            path="/leagues"
            element={<Leagues leagues={filteredLeagues} />}
          />
          <Route path="/fixtures" element={<div>fixtures</div>} />
        </Routes>
      </div>
    </Router>
  );
}
