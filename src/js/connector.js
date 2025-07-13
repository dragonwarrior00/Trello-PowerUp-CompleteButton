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
              if (card.dueComplete){
                 return [];
              }

              // put in the card in a complete state = mark complete, change label, archive
              if (!card.dueComplete){

                console.log("Card Archived State: ")

                  // mark the card as complete
                  return t.set('card', 'shared', 'closed', true); // Marking the card as complete
              }
            }.catch(function(error) {
              console.error("Permission error: ", error);
              // Handle the error (e.g., notify the user)
            }),
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