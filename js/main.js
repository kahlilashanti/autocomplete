// grab any dom elements and assign a variable to them

const search = document.getElementById('search');

const matchList = document.getElementById('match-list');

//function to search states.json and filter it
const searchStates = async searchText => {
  //get the response(res) from the api
  const res = await fetch('../data/states.json');
  //with a fetch api we don't get the data right away we need to tell it we want it to be json
  const states = await res.json();
  //the await res.json() will give us the states as a json object

  //let's log it so we can check the response
  // console.log(states);
  //we want to filter through 'states' and display what we find there so let's use a regex for that

//get matches to current text input
let matches = states.filter(state => {
  const regex = new RegExp(`^${searchText}`, 'gi');
  //return an array that matches those
  //gi are global and case insensitive flags for regex
  return state.name.match(regex) || state.abbr.match(regex);
});

if(searchText.length === 0){
  matches = [];
  matchList.innerHTML = '';
}

// console.log(matches);

outputHtml(matches);
};

//show results in HTML
const outputHtml = matches => {
  if(matches.length > 0) {
    //map through the matches array and spit out an array of html
    const html = matches.map(match => `
      <div class="card card-body mb-4">
        <h4>
          ${match.name} (${match.abbr})
            <span class="text-primary">
              ${match.capital}
            </span>
        </h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
      </div>
      `).join('');

      // console.log(html);

      matchList.innerHTML=html;
  }
}

// every time we type in the input box we need to fire off an event that calls a function
//add an event listener to search

//we need to call value on search otherwise it just gives us the element
search.addEventListener('input', () => searchStates(search.value));
