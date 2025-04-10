$(document).ready(function () {

  // About section toggle
  $(".about-text button").on("click", function () {
    $("#more-info")
      .html(`
        <p>
          We aim to create meaningful, personalized travel experiences that connect you to the heart of every destination. 
          Whether you're a solo explorer, a couple, or a family—Travel helps you discover stories that last a lifetime.
        </p>
      `)
      .hide()
      .slideDown(700);

    $(this)
      .text("Show Less")
      .off("click")
      .on("click", function () {
        $("#more-info").slideUp(400, function () {
          $("#more-info").empty();
        });
        $(this).text("Learn More");
      });
  });

  // Smooth scroll for nav links
  $(".navigation a").on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(target).offset().top }, 800);
  });

  // Smooth scroll for hero button
  $("#startJourneyBtn").on("click", function () {
    $("html, body").animate({
      scrollTop: $("#About").offset().top - 80
    }, 800);
  });

  // Fetch inspirational quote
  $("#getQuote").on("click", function () {
    $("#loadingMsg").text("Loading quote...").show();
    $("#quoteBox").hide();

    $.ajax({
      url: "https://api.api-ninjas.com/v1/quotes",
      method: "GET",
      headers: { 'X-Api-Key': 'MIRlkFkqcn4k5MAozfYEPw==ga2dtk3piVKqzaF0' },
      success: function (data) {
        if (data && data.length > 0) {
          const quote = data[0].quote;
          const author = data[0].author || "Unknown";

          $("#loadingMsg").hide();
          $("#quoteBox").html(`
            <blockquote style="font-style: italic; font-size: 1.2rem; margin-bottom: 0.5rem;">
              “${quote}”
            </blockquote>
            <p style="text-align: right; font-weight: bold;">– ${author}</p>
          `).fadeIn();
        } else {
          $("#loadingMsg").hide();
          $("#quoteBox").html(`<p style="color:red;">❌ No quotes found. Please try again later.</p>`).fadeIn();
        }
      },
      error: function () {
        $("#loadingMsg").hide();
        $("#quoteBox").html(`<p style="color:red;">❌ Couldn't load quote from the API. Please try again later.</p>`).fadeIn();
      }
    });
  });

  // Weather API for a city
  $("#getWeather").on("click", function () {
    const city = $("#cityInput").val().trim();
    if (!city) {
      $("#weatherResult").html("<p>Please enter a city name.</p>");
      return;
    }

    $("#weatherResult").html("<p>Loading...</p>");

    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e337e05f491e1958e6c8dd9efab90f71&units=metric`,
      method: "GET",
      success: function (data) {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;

        $("#weatherResult").html(`
          <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon"><br>
          ${city.toUpperCase()}: ${temp}°C, ${desc}</p>
        `);
      },
      error: function () {
        $("#weatherResult").html("<p>Could not fetch weather. Try again later.</p>");
      }
    });
  });

  // Contact form validation
  $("#contactForm").validate({
    rules: {
      username: { required: true, minlength: 2 },
      email: { required: true, email: true },
      message: { required: true, minlength: 5 },
    },
    messages: {
      username: "Please enter at least 2 characters.",
      email: "Please enter a valid email address.",
      message: "Your message must be at least 5 characters.",
    },
    submitHandler: function (form) {
      const name = $("#username").val();

      $("#thankYouMsg")
        .hide()
        .text(`Thank you, ${name}! We'll be in touch soon ✨`)
        .fadeIn();

      $("html, body").animate(
        { scrollTop: $("#thankYouMsg").offset().top - 50 },
        600
      );

      $("#contactForm").fadeOut();

      setTimeout(() => {
        form.reset();
        $("#contactForm").fadeIn();
        $("#thankYouMsg").fadeOut();
      }, 5000);
    }
  });

  // Theme toggle
  $("#toggleTheme").on("change", function () {
    $("body").toggleClass("dark", this.checked);
  });

  // FAQ accordion
  $("#accordion").accordion({
    heightStyle: "content",
    collapsible: true
  });

  // Date picker
  $("#travelDate").datepicker({
    dateFormat: "dd MM yy",
    minDate: 0
  });

  // Draggable box
  $("#dragBox").draggable();

  // Testimonials tabs
  $("#tabs").tabs();
  $("#travelNote").resizable();
});
  





function initMap() {
  const locations = [
    {
      name: "Crystal Beach, Bahamas",
      position: { lat: 25.0343, lng: -77.3963 }
    },
    {
      name: "Mystic Forest, Oregon",
      position: { lat: 44.0582, lng: -121.3153 }
    },
    {
      name: "Serene Lake, Switzerland",
      position: { lat: 46.7986, lng: 8.2318 }
    },
    {
      name: "Golden Peaks, Colorado",
      position: { lat: 39.5501, lng: -105.7821 }
    }
  ];

  const map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 3,
    center: locations[0].position,
  });

  locations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: loc.position,
      map: map,
      title: loc.name
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${loc.name}</strong>`
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}
