var countDownDate = new Date().getDate();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
  // Output the result in an element with id="demo"
  console.log(hours)
    
  // If the count down is over, write some text 
  
}, 1000);
