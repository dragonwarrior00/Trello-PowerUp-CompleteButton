const getModifyPermission = function (modify) {

  console.log("KEY: %%API_KEY%%&" + " URL: %%API_RETURN_URL%%")

  const t = window.TrelloPowerUp.iframe();

  // API_KEY, API_RETURN_URL = custom env variable in netlify
  const authURL =
    "https://trello.com/1/authorize?expiration=never" +
    "&scope=read&key=d1aaeec275328ca489fb077f25dee106&callback_method=fragment" +
    "&return_url=https://api.netlify.com/auth/done";


}

const getCompleteDetailBadge = function(t) {
  return t
      // duecomplete = Archived, closed = Mark complete
      .card("id","closed","labels","dueComplete")
      .then(function (card) {

        console.log(card)   //temp

        if (!card.closed){
            return [{
                // create detail badge itself
                title: "Mark as Complete",
                text: "Complete",
                color: "green",
                callback: function (t) {

                    // function to run on click
                    t.authorize(authURL)
                      .then(function(token){
                        // put the card in a complete state (e.g. mark complete, change label, archive)
                        return t
                          .set('card', 'shared', 'closed', true)
                          .then(function() {
                            console.log("Card marked as complete!");
                          }).catch(function(error) {
                            console.error("Permission error: ", error);
                            // Notify the user about the permission issue
                          });
                      })
                      .then(function(){
                        return t.closePopup();
                      });
                },
            }];
        }
        return [];
    });
}


window.TrelloPowerUp.initialize({
  "on-enable": function (t){
    return getModifyPermission(t)
  },
  "card-detail-badges": function (t) {
    // return an array of cards that adds Complete Badge
    return getCompleteDetailBadge(t)
  },
});