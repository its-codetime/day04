const allCountries = document.querySelector(".all");
const India = document.querySelector(".India");
const errorDiv = document.querySelector(".error");
const url = `https://restcountries.com/v3.1/all`;

const fetchCountries = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const render = (countries, IndiaDetails) => {
  // prettify json
  const IndiaDetailsStr = JSON.stringify(IndiaDetails, null, 2).slice(2, -2);
  India.innerHTML = IndiaDetailsStr;
  India.classList.toggle("hidden");

  const allCountriesStr = JSON.stringify(countries, null, 2);
  allCountries.innerHTML = allCountriesStr;
  allCountries.classList.toggle("hidden");
};

const extractDetails = (country) => ({
  name: country.name.common,
  flag: country.flag || "flag not found",
  region: country.region || "region not found",
  subregion: country.subregion || "subregion not found",
  population: country.population || "population not found",
});

const printFlags = (countries) => {
  let flags = {};
  countries.forEach((country) => {
    flags[country.name.common] = country.flag || "flag not found";
  });
  console.log(flags);
};

const addCountriesToDom = (countries) => {
  let countriesDetails = [];
  let IndiaDetails = {};
  countries.forEach((country) => {
    // extract India details to display at the top
    if (country.name.common === "India") {
      IndiaDetails = extractDetails(country);
    }
    // extract all countries details
    countriesDetails.push(extractDetails(country));
  });
  // sort countries by name
  countriesDetails = countriesDetails.sort((c1, c2) =>
    c1.name.localeCompare(c2.name)
  );
  // takes care of manipulating the DOM
  render(countriesDetails, IndiaDetails);
};

fetchCountries(url)
  .then((countries) => {
    printFlags(countries);
    addCountriesToDom(countries);
  })
  .catch((error) => {
    errorDiv.innerHTML = error.message;
    console.log({ error });
  });
