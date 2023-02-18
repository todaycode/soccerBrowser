import axios from "axios";

const options = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/",
  headers: {
    "X-RapidAPI-Key": "3da23fff88mshec1066374ade1d6p11d655jsn50c55b5065dd",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
  }
};

const genOptions = (suffix) => {
  const newOptions = { ...options };
  newOptions.url += suffix;
  return newOptions;
};

export const getCountries = () =>
  new Promise((resolve, reject) => {
    if (localStorage.getItem("countries")) {
      return resolve(JSON.parse(localStorage.getItem("countries")));
    }
    axios
      .request(genOptions("countries"))
      .then(function (response) {
        localStorage.setItem("countries", JSON.stringify(response.data));
        resolve(response.data);
        console.log("from server");
      })
      .catch(function (error) {
        reject(error);
      });
  });

export const getLeagues = () =>
  new Promise((resolve, reject) => {
    if (localStorage.getItem("leagues")) {
      return resolve(JSON.parse(localStorage.getItem("leagues")));
    }
    axios
      .request(genOptions("leagues"))
      .then(function (response) {
        localStorage.setItem("leagues", JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
