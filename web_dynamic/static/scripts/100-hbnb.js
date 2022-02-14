// listen changes
let amenityChecked = {};
let stateChecked = {};
let cityChecked = {};
$(document).ready(function () {
  $('.amenities input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenityChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityChecked[$(this).data('id')];
    }
    $('div.amenities h4').html(function () {
      let amenities = [];
      Object.keys(amenityChecked).forEach(function (key) {
        amenities.push(amenityChecked[key]);
      });
      if (amenities.length === 0) {
        return ('&nbsp');
      }
      return (amenities.join(', '));
    });
  });

  $('.locations > ul > li > h2 > input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      stateChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete stateChecked[$(this).data('id')];
    }
  });

  $('.locations > ul > ul > li > input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      cityChecked[$(this).data('id')] = $(this).data('name');
    } else {
      delete cityChecked[$(this).data('id')];
    }
  });
  $('.locations input:checkbox').change(function () {
    $('div.locations h4').html(function () {
      let locations = [];
      Object.keys(stateChecked).forEach(function (key) {
        locations.push(stateChecked[key]);
      });
      Object.keys(cityChecked).forEach(function (key) {
        locations.push(cityChecked[key]);
      });
      if (locations.length === 0) {
        return ('&nbsp');
      }
      return (locations.join(', '));
    });
  });
});

// check if changes
let url = 'http://0.0.0.0:5001/api/v1/status/';
$.get(url, function (data, status) {
  if (data.status === 'OK') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

// search button
$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: '{}',
  success: function (data) {
    for (let currentPlace of data) {
      $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom  </div></div> <div class="user"></div><div class="description">' + currentPlace.description + '</div></article>');
    }
  }
});

// post request$(document).ready(function () {
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({'amenities': Object.keys(amenityChecked), 'states': Object.keys(stateChecked), 'cities': Object.keys(cityChecked)}),
      contentType: 'application/json',
      success: function (data) {
        $('.places').empty();
        $('.places').append('<h1>Places</h1>');
        for (let currentPlace of data) {
          $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom  </div></div> <div class="user"></div><div class="description">' + currentPlace.description + '</div></article>');
        }
      }
    });
  });
});
