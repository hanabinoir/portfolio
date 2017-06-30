$(document).ready(function() {
    getRandomQuote();

    $("i#random-quote").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        getRandomQuote();
    });
});

function getRandomQuote() {
    var quoteAPI = "https://andruxnet-random-famous-quotes.p.mashape.com/cat=";

    $.ajax({
        headers: {
          "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: quoteAPI,
        success: function(quote) {
            console.log(quote);
            $('.quote-text').html(quote.quote);
            $('.quote-author').html("-- " + quote.author);

            $(".twitter-share-button")
            .attr(
                'data-text',
                quote.quote + " -- " +
                quote.author + " @hanabinoir"
            );
            $.getScript("https://platform.twitter.com/widgets.js");
        }
    })
}
