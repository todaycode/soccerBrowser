import axios from "axios";

const options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/",
  headers: {
    "X-RapidAPI-Key": "3da23fff88mshec1066374ade1d6p11d655jsn50c55b5065dd",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
  }
};

const genOptions = (suffix, params) => {
  const newOptions = JSON.parse(JSON.stringify(options));
  newOptions.url += suffix;
  if (params) newOptions.params = params;
  return newOptions;
};

const apiCall = (url, params) =>
  new Promise((resolve, reject) => {
    let key = url + (params ? JSON.stringify(params) : "");
    if (localStorage.getItem(key)) {
      return resolve(JSON.parse(localStorage.getItem(key)));
    }
    axios
      .request(genOptions(url, params))
      .then(function (response) {
        localStorage.setItem(key, JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
  });

export const getCountries = () => apiCall("countries");

export const getLeagues = () => apiCall("leagues");

export const getFixturesByLeagueId = async (league, season) => {
  let { response } = await apiCall("fixtures", { league, season });
  let sorted = response.length
    ? response.sort((a, b) => {
        let adate = new Date(a.fixture.date);
        let bdate = new Date(b.fixture.date);
        return adate.getTime() - bdate.getTime();
      })
    : [];
  return sorted;
};
// export const getFixturesByLeagueId = (league, season) => {
//   const options = genOptions("fixtures", { league, season });
//   return new Promise((resolve, reject) => {
//     axios
//       .request(options)
//       .then(function (response) {
//         resolve(response.data);
//       })
//       .catch(function (error) {
//         reject(error);
//       });
//   });
// };
