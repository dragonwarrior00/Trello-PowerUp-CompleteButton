console.log("Hello World!")

const getCompleteDetailBadge = function(t) {
  return t
      //.card("name","labels","closed")
      .card(all)
      //.get("name")
      .then(function (card) {

        console.log(card);

        return [
          {
            // create detail badge itself
            title: "Mark as Complete",
            text: "Complete",
            color: "green",
            callback: function (t) {
              // function to run on click
              console.log("The button to complete has been clicked.");
              console.log("Card Name: " + card.name)
              //return t.set("card", "shared", )
            },
          },
        ];
      });
}


window.TrelloPowerUp.initialize({
  "card-detail-badges": function (t) {
    // return an array of cards that adds Complete Badge
    return getCompleteDetailBadge(t)
  },
});
