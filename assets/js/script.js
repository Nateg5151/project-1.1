
var APIKey = 'AIzaSyBvIvqYLhRUxpdWtBQWG51NuOXUsXzlfhE';
var searchBtn = document.getElementById('search-btn');


function getBrewerybyState() {
    var stateInput = document.getElementById('search-input').value;

    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateInput}&per_page=50`, {
        method: 'GET',
        credentials: 'same-origin',
        per_page: 50,
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            mapApi(data);
            breweryCall(data);
        })
        
};

function mapApi(data) {
    console.log(data);

    $("#googleapi").html(`<iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBvIvqYLhRUxpdWtBQWG51NuOXUsXzlfhE&q=${data[0].state}">`)

}
function breweryCall(data) {
    console.log(data + "line 98" + data[3].name);
    for (var i = 0; i < 6; i++) {
                var name = data[i].name;
                var street = data[i].street;
                var city = data[i].city;
                var state = data[i].state;
                var postal_code = data[i].postal_code;
                var phone = data[i].phone;
                var website_url = data[i].website_url;
                var latitude = data[i].latitude;
                var longitude = data[i].longitude;
                var breweryCard = $('<div>').addClass('singlecard tile is-child').attr('style', 'background-color: #34A8DA', 'margin: 10px','width: 18rem;');
                $('#brewery-list-rtn').append(breweryCard);
                breweryCard.append($('<h3 class="card-title">').text(name));
                breweryCard.append($('<p class="card-text">').text(street));
                breweryCard.append($('<p class="card-text">').text(city));
                breweryCard.append($('<p class="card-text">').text(state));
                breweryCard.append($('<p class="card-text">').text(postal_code));
                breweryCard.append($('<p class="card-text">').text(phone));
                breweryCard.append($(`<a class="card-link" href="`+website_url+`">`).text(website_url));
    }
};

searchBtn.addEventListener('click', getBrewerybyState);

$("#todayDate").text(dayjs().format(' dddd, MMMM DD, YYYY'));

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closemodal() {
    modal.style.display = "none";
}
span.onclick = function() {
  closemodal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Setting up function to store email and name in local storage
function storagebin() {
    var emailList = [];
    var nameList = [];
    var name = $('#name').val();
    var email = $('#email').val();
    var checkArray = emailList.includes(email);
   
    if (checkArray === true) {
        return
    } 
    else {
      emailList.push(email);
      nameList.push(name);
    localStorage.setItem('email', JSON.stringify(emailList));
    localStorage.setItem('name', JSON.stringify(nameList));
    };
    
};
// When the user clicks submit, the email and name are stored in local storage
$('#notifyBtn').click(function() {
    storagebin();
    closemodal();
});
 // Function to call name from local storage 
function nameCall(){
    var nameList = JSON.parse(localStorage.getItem('name'));
    if (nameList === null) {
        return
    }
    else
    $('#stored-name').append(" "+ nameList + ", ");
}
nameCall();
