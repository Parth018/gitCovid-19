import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableURL = url;

  if (country) {
    changeableURL = `${url}/countries${country}`;
  }

  // try {
  //   const {
  //     data: { confirmed, recovered, deaths, lastUpdate },
  //   } = await axios.get(url);

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableURL);

    // const modifieData = {
    //     confirmed: data.confirmed,
    //     recovered: data.recovered,
    //     deaths:data.deaths,
    //     lastUpdate:data.lastUpdate
    // }
    //return modifieData;

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    // const modifieData = data.map((dailyData) => ({
    //   confirmed: dailyData.confirmed.total,
    //   deaths: dailyData.deaths.total,
    //   date: dailyData.reportDate,
    // }));

    // return modifieData;

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {}
};
