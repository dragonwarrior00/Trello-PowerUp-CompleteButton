
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
                callback: function (done) {

                    return t.get('card', 'id').then(function (cardId) {
                        return t.set('card', 'archived', true).then(function () {
                            return t.closePopup();
                        });
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
  // 'on-enable': function (permission){
  //   return getModifyPermission(t)
  // },
  'card-detail-badges': function (carddetail) {
    // return an array of cards that adds Complete Badge
    return getCompleteDetailBadge(t)
  },
});