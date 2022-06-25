// Animations and hovers
let navToggler = 0;
let dataContainer = document.getElementById('dataContainer');
let removeActive = document.querySelectorAll('.removeActive');
console.log(removeActive);

fetchData('https://api.themoviedb.org/3/movie/now_playing?api_key=bf369bb0e503052f7e688dc460012ad0&language=en-US&page=1');

$('#navButton').click(()=>{
    if(navToggler==0){
        $('#navContent').animate({left: '0px'},500, function(){
            $('#nowPlaying1').animate({paddingTop : '0px'},400, function(){
                $('#popular1').animate({paddingTop : '0px'},400, function(){
                    $('#topRated1').animate({paddingTop : '0px'},400, function(){
                        $('#trending1').animate({paddingTop : '0px'},400, function(){
                            $('#upcoming1').animate({paddingTop : '0px'},400, function(){
                                $('#contactUs1').animate({paddingTop : '0px'},400)
                            })
                        })
                    })
                })
            })
        });
        $('#navButton').removeClass('fa-bars');
        $('#navButton').addClass('fa-xmark');
        navToggler=1;
    }

    else{
        $('#nowPlaying1').animate({paddingTop : '700px'},1500);
        $('#popular1').animate({paddingTop : '700px'},1500);
        $('#topRated1').animate({paddingTop : '700px'},1500);
        $('#trending1').animate({paddingTop : '700px'},1500);
        $('#upcoming1').animate({paddingTop : '700px'},1500);
        $('#contactUs1').animate({paddingTop : '700px'},1500);
        $('#navContent').animate({left: '-250px'},500);
        $('#navButton').addClass('fa-bars');
        $('#navButton').removeClass('fa-xmark');
        navToggler=0;
    }
});

$('#nowPlaying').click(()=>{
    fetchData('https://api.themoviedb.org/3/movie/now_playing?api_key=bf369bb0e503052f7e688dc460012ad0&language=en-US&page=1');
    removeClassAll();
    $("#nowPlaying").addClass('active');
});

$('#popular').click(()=>{
    fetchData('https://api.themoviedb.org/3/movie/popular?api_key=bf369bb0e503052f7e688dc460012ad0&language=en-US&page=1');
    removeClassAll();
    $("#popular").addClass('active');
});

$('#topRated').click(()=>{
    fetchData('https://api.themoviedb.org/3/movie/top_rated?api_key=bf369bb0e503052f7e688dc460012ad0&language=en-US&page=1');
    removeClassAll();
    $("#topRated").addClass('active');
});

$('#trending').click(()=>{
    fetchData('https://api.themoviedb.org/3/trending/all/day?api_key=bf369bb0e503052f7e688dc460012ad0&page=1');
    removeClassAll();
    $("#trending").addClass('active');
});

$('#upcoming').click(()=>{
    fetchData('https://api.themoviedb.org/3/movie/upcoming?api_key=bf369bb0e503052f7e688dc460012ad0&language=en-US&page=1');
    removeClassAll();
    $("#upcoming").addClass('active');
});

$('#contactUs').click(()=>{
    removeClassAll();
    $("#contactUs").addClass('active');
    let x = $('#contactSection').offset().top;
    $(window).scrollTop(x);
});

$('#searchMovie').keyup(()=> { 
    let x = $('#searchMovie').val();
    if(x==''){
        fetchData('https://api.themoviedb.org/3/movie/now_playing?api_key=bf369bb0e503052f7e688dc460012ad0&language=en-US&page=1');
        removeClassAll();
        $("#nowPlaying").addClass('active'); 
    }

    else{
    fetchData(`https://api.themoviedb.org/3/search/movie?api_key=bf369bb0e503052f7e688dc460012ad0&language=en-US&page=1&query=${x}&page=1`);
    }
});

$('#searchByName').keyup(()=>{
    dataContainer.innerHTML='';
    let x = $('#searchByName').val();
    for(let i =0; i<searchItems.results.length; i++){
        if(searchItems.results[i].original_title.toLowerCase().search(x.toLowerCase())==-1){
         console.log(i);   
        }
        else{
          dataContainer.innerHTML += `
          <!-- Div Design to display movies from DB -->
          <div class="col-md-3 p-3 film-hover">
              <div class="position-relative overflow-hidden">
                  <div class="image-hover d-flex flex-column justify-content-center text-center p-2">
                      <h2>${searchItems.results[i].original_title}</h2>
                      <p>${searchItems.results[i].overview}</p>
                      <h5>Rating: ${searchItems.results[i].vote_average}</h5>
                      <h5>${searchItems.results[i].release_date}</h5>
                  </div>
                  <img src="https://image.tmdb.org/t/p/w500${searchItems.results[i].poster_path}" class="w-100" alt="${searchItems.results[i].original_title}">
              </div>
          </div>
          <!-- End of Div design -->
          `  
        }
    }
});

function removeClassAll(){
    for (let i =0; i<6; i++){
        removeActive[i].classList.remove('active');
    }
};

$('#validName').keyup(()=>{
    // Capital letter followed by 2 to 15 small letters
    validateRegex('validName',/^[A-Z][a-z]{2,15}$/);
});


$('#validEmail').keyup(()=>{
    // Example: amr@gmail.com
    validateRegex('validEmail',/^([A-Z]|[a-z]|[0-9]){1,}@[A-Z a-z 0-9]{1,7}\.[a-z]{3}$/g);
});

$('#validPhone').keyup(()=>{
    // Example: 20 01001729510
    validateRegex('validPhone',/^(20|)(010|011|012|015)[0-9]{8}$/);
});

$('#validAge').keyup(()=>{
    // Example: 18 and up to 99
    validateRegex('validAge',/^(1[8-9]|[2-9][0-9])$/g);
});

$('#validPassword').keyup(()=>{
    // Example: Contains uppercase lowercase, number, and special character
    validateRegex('validPassword',/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/g);
});

$('#retypePassword').keyup(()=>{
    isIdentical('#retypePassword');
});








// Section for APIs and getting data

let searchItems =[];

async function fetchData(url){
    let fetchedData = await fetch(`${url}`);
    let arrayData = await fetchedData.json();
    searchItems=arrayData;
    displayData(arrayData);
};


function displayData(x){
   dataContainer.innerHTML ='';
   for (var i =0; i<x.results.length; i++){
    dataContainer.innerHTML += `
    <!-- Div Design to display movies from DB -->
    <div class="col-md-3 p-3 film-hover">
        <div class="position-relative overflow-hidden">
            <div class="image-hover d-flex flex-column justify-content-center text-center p-2">
                <h2>${x.results[i].original_title}</h2>
                <p>${x.results[i].overview}</p>
                <h5>Rating: ${x.results[i].vote_average}</h5>
                <h5>${x.results[i].release_date}</h5>
            </div>
            <img src="https://image.tmdb.org/t/p/w500${x.results[i].poster_path}" class="w-100" alt="${x.results[i].original_title}">
        </div>
    </div>
    <!-- End of Div design -->
    `
   }
};



// Contact info validation section


function validateRegex(id, regEx){
    let x = $(`#${id}`).val();
    let y = regEx;
    if(y.test(x) == true){
        $(`#${id}`).removeClass('is-invalid');
        $(`#${id}`).addClass('is-valid');
    }

    else if(x==''){
        $(`#${id}`).removeClass('is-valid');
        $(`#${id}`).removeClass('is-invalid');
    }

    else{
        $(`#${id}`).removeClass('is-valid');
        $(`#${id}`).addClass('is-invalid');
    }
}


function isIdentical(pass){
    if($(pass).val()==$('#validPassword').val()){
        $(pass).removeClass('is-invalid');
        $(pass).addClass('is-valid');
    }

    else if($(pass).val()==''){
        $(pass).removeClass('is-valid');
        $(pass).removeClass('is-invalid');
    }

    else{
        $(pass).removeClass('is-valid');
        $(pass).addClass('is-invalid');
    }
};

