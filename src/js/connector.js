
const getCompleteDetailBadge = function(t) {
  return t
      // duecomplete = Archived, closed = Mark complete
      .card('id','closed','labels','dueComplete')
      .then(function (card) {

        console.log(card)   //temp

        if (!card.closed){
            return [{
                // create detail badge itself
                title: 'Mark as Complete',
                text: 'Complete',
                color: 'green',
                callback: function (t) {

                    return t.get('card', 'id').then(function (cardId) {
                        // return t.set('card', 'shared', 'archived', true).then(function () {
                        //     return t.closePopup();
                        // });
                        console.log("Modifying card to archive mode.")
                    }).catch(function (error) {
                        console.error('Error archiving card:', error);
                    });
                },
            }];
        }
        return [];
    });
}


window.TrelloPowerUp.initialize({
  'card-detail-badges': function (t) {
    // return an array of cards that adds Complete Badge
    return getCompleteDetailBadge(t)
  },
});