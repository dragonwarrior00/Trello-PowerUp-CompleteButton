
const getCompleteDetailBadge = function(t) {
  return t
      // duecomplete = Archived, closed = Mark complete
      .card('id','closed','labels','dueComplete')
      .then(function (card) {
        console.log(card);   //temp

        if (!card.closed){
            return [{
                // create detail badge itself
                title: 'Mark as Complete',
                text: 'Complete',
                color: 'green',
                callback: function (t) {
                    if (t.memberCanWriteToModel('card')){
                        // return t.get('card', 'shared').then(function (data) {
                        //     console.log("Data is present... ")
                        //     data.set('card', 'archived', true).then(function () {
                        //         data.closePopup();
                        //     });
                        // }).catch(function (error) {
                        //     console.error('Error archiving card:', error);
                        // });
                        // Add a green "Complete" label to the card
                      return t.getRestApi()
                        .then(function(api) {
                          console.log(`API: ${api}`);
                          return api.addLabelToCard(card.id, {
                            color: 'green',
                            name: 'Complete'
                          });
                        })
                        .then(function() {
                          return t.closePopup();
                        })
                        .catch(function(error) {
                          console.error('Error adding label:', error);
                          return t.closePopup();
                        });
                    }
                }
            }];
        }
        return [];
    });
}


window.TrelloPowerUp.initialize(
  {
    'card-detail-badges': function (t) {
      // return an array of cards that adds Complete Badge
      return getCompleteDetailBadge(t)
    }
  },
  {
      appKey: 'd1aaeec275328ca489fb077f25dee106',
      appName: 'Complete',
      appAuthor: 'DragonWarrior00',
  }
);