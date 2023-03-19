//create async function to communicate with API
//use string interpolation as the params object method would not communicate key appropriately with API
async function searchGIFs(term) {
    console.log(term.value);
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${term.value}&api_key=u9q26PKyO8kczMZ0g1qTCg5d38wplRMO`);
    const arrLength = res.data.data.length;
    const url = (res.data.data[Math.floor(Math.random() * arrLength)].embed_url);
    appendGIF(url);
}

//take source url from searchGIFs function and create img (iframe tag) with appropriate source and append to dom
function appendGIF(source) {
    const img = document.createElement('IFRAME');
    img.src = source;
    img.setAttribute('class', 'gif')
    $('#gifList').append(img);
}

//event handler for form submission, capture value and pass to searchGIFs function. 
$('#search').on('submit', function(e){
    e.preventDefault();
    if ($('#searchTerm').val() === "") {
        alert("Please enter a search term");
    } else {
    const term = document.querySelector("#searchTerm")
    searchGIFs(term);
    term.value = '';
    }
});

//create button function to remove all gifs from the dom. 
$('#delete').on('click', function(){
    $('.gif').detach();
})