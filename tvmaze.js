// function sends request to and receive response from TVMaze server
async function searchShows(query) {

  try{

    // Sends request to and receive response from TVMaze server using users parameters
    // Also creates array
    const shows = await axios.get("http://api.tvmaze.com/search/shows",{params: {q:query}});
    const arrOfShows = [];

    // for loop runs through data that was received and call each object to get key-value pair to create object
    // object is added to array
    for(let item of shows.data){
      if(!item.show.image){item.show.image = {'medium':'https://tinyurl.com/tv-missing'}};
      const obj = {
        id: item.show.id,
        name: item.show.name,
        summary: item.show.summary,
        image: item.show.image.medium 
      };
      arrOfShows.push(obj);
    }
    // returns our created array of objects
    return arrOfShows;

  }catch(e){
    console.log(e.message);
  }

}

// function extracts data from array of objects
// function creates and injects HTML elements into DOM
function populateShows(shows) {
  const showsList = $("#shows-list");
  showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">${show.summary}</p>
              <img class="card-img-top" src="${show.image}">
            </div>
           <button class="btn btn-primary" id="episodes">Episodes</button>
         </div>
       </div>
      `);
    showsList.append($item);
  }
}


// gets submit form, sets up listener for the form and calls handleSearch function
// handelSearch extracts value search from the form, and sends request to and receivew response from Tv Maze App
// calls function populateShows
$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


// cretaes li elemets with value extracted from object and apends to ul element
function populateEpisodes(arr){
  const episodesList = $('#episodes-list');
    episodesList.empty();
  for(let el of arr){
    let li = $(`<li>${el.name} (season ${el.season}, number ${el.number})</li>`);
    episodesList.append(li);
  }
  $("#episodes-area").show();
}

// sends request to and retrieves response from Tvmaze app using id of the movie
// calls function populateEpisodes
async function getEpisodes(id) {
  try{
    const episodes = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
    const arrEpisodes = [];

    for(let episod of episodes.data){
      obj = {
        id: episod.id,
        name : episod.name,
        season : episod.season,
        number : episod.number
      }
      arrEpisodes.push(obj);
    }
    populateEpisodes(arrEpisodes);
  }catch(e){
    console.log(e.message)
  }
}

// sets up event listener to the button elemets with id 'episodes' that would be created using function populateShows
// retrieves id from attribute of the div element that would be created using function populateShows
// sends id of movie to the function getEpisodes
$("#shows-list").on("click", '#episodes', async function(e) {
    let id = $(e.target).parent().attr("data-show-id");
    await getEpisodes(id);
  }
);