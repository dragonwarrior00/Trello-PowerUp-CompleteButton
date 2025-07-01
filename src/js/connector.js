console.log("Hello World!")

window.TrelloPowerUp.initialize({
  "card-detail-badges": function (t, opts) {
    return t
      .card("name")
      //.get("name")
      .card("all")
      .then(function (cardName) {
        console.log("We just loaded the card name for fun: " + cardName);

        return [
          {
            // create detail badge itself
            title: "Mark as Complete",
            text: "Complete",
            color: "green",
            callback: function (t, opts) {
              // function to run on click
              console.log("The button to complete has been clicked.")
            },
          },
        ];
      });
  },
});
