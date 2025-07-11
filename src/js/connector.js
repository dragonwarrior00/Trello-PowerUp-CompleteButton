console.log("Hello World!")

const getCompleteDetailBadge = function(t) {
  return t
      // duecomplete = Archived, closed = Mark complete
      .card("name","closed","labels","dueComplete")
      //.card("all")
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
              console.log("The button to complete has been clicked. " + card.dueComplete);

              // no actions needed if already archived.
              if (card.dueComplete == "true"){
                 return [];
              }

              // put in the card in a complete state = mark complete, change label, archive
              if (!card.dueComplete){

                console.log("Card Archived State: ")

                return t
                  .set("card", "shared", card.closed, "true");
                // .set("card", "shared", "labels", "labels[0]");
                // .set("card", "shared", "duecomplete", "true");


              }
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
