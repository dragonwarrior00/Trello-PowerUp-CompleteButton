console.log("Hello World!")

window.TrelloPowerUp.initialize({
  "card-detail-badges": function (t, opts) {
    return t
      .card("name","labels","closed")
      //.get("name")
      .then(function (card) {
        console.log(card.labels);

        return [
          {
            // create detail badge itself
            title: "Mark as Complete",
            text: "Complete",
            color: "green",
            callback: function (t, opts) {
              // function to run on click
              console.log("The button to complete has been clicked.");
            },
          },
        ];
      });
  },
});
