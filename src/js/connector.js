const getCompleteDetailBadge = function(t) {
  return t
      // duecomplete = Archived, closed = Mark complete
      .card("id","closed","labels","dueComplete")
      .then(function (card) {

        console.log(card)

        if (!card.closed){
            return [{
                // create detail badge itself
                title: "Mark as Complete",
                text: "Complete",
                color: "green",
                callback: function (t) {
                    // function to run on click
                    return t.authorize().then(function(){
                      // put the card in a complete state (e.g. mark complete, change label, archive)
                      return t.set('card', 'shared', 'closed', true).then(function() {
                        console.log("Card marked as complete!");
                      }).catch(function(error) {
                        console.error("Permission error: ", error);
                        // Notify the user about the permission issue
                      });
                    });
                },
            }];
        }
        return [];
    });
}


window.TrelloPowerUp.initialize({
  "card-detail-badges": function (t) {
    // return an array of cards that adds Complete Badge
    return getCompleteDetailBadge(t)
  },
});