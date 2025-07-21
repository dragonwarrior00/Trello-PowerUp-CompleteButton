
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
                        // return t.getAll().then(function (t){
                        return t.get('board', 'shared').then(function (data) {
                            return data.set('card', 'archived', true).then(function () {
                                return data.closePopup();
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