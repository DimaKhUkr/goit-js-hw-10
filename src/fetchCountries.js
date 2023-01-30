export const fetchCountries = function (name) {
  //   if (name.length === 0) {
  //     return Notiflix.Notify.failure('Введите данные');
  //   }
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(r => {
    if (!r.ok) {
      console.log(r.status);
      throw new Error(r.status);
    }
    return r.json();
  });
};
