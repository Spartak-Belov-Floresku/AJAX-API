describe('Testing block of functions searchShows(), populateShows(), getEpisodes(), and populateEpisodes()', function(){
    beforeEach(function () {
        showsList = $("#shows-list");
        episodesList = $("#episodes-list")
    });

    it('This block has to activate and run searchShows() and populateShows() to retrieve data from server. populateShows() has to create dom`s elements. ', async function () {
        const result = await searchShows("hike");
            expect(result).toBeInstanceOf(Array);
        populateShows(result)
            expect(showsList.length > 0).toBe(true);
    });


    it('This block has to activate and run getEpisodes() and populateEpisodes() to retrieve data from server. populateEpisodes() has to create dom`s elements. ', async function(){
        const divs = document.querySelectorAll(".card");
            expect(divs.length > 0).toBe(true);
        const id = divs[0].getAttribute('data-show-id')
            expect(parseInt(id)).toBeInstanceOf(Number)
        await getEpisodes(id);
            expect(episodesList.length > 0).toBe(true);
    });

    afterEach( function () {
        setTimeout(()=>{
            showsList.empty();
            episodesList.empty();
        },1000);
    })
});


