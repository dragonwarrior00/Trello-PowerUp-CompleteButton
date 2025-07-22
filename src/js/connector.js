
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
                    if (t.memberCanWriteToModel('card')){
                        t.get('board', 'shared').then(function (data) {
                            console.log(JSON.stringify(data, null, 2))
                            console.log("Data is present...")
                            data.set('card', 'archived', true).then(function () {
                                data.closePopup();
                            });
                        }).catch(function (error) {
                            console.error('Error archiving card:', error);
                        });
                    }
                }
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