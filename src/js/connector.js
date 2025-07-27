const getCompleteDetailBadge = function(t) {
  return t
    // duecomplete = Archived, closed = Mark complete
    .card('id', 'closed', 'labels', 'dueComplete')
    .then(function(card) {
      console.log(card); // temp

      if (!card.closed) {
        return [{
          // create detail badge itself
          title: 'Mark as Complete',
          text: 'Complete',
          color: 'green',
          callback: function(t) {
            if (t.memberCanWriteToModel('card')) {
              // Add a green "Complete" label to the card using Trello REST API
              // Replace with your API key and token
              const apiKey = `%%API_KEY%%`;
              const token = `%%API_TOKEN%%`;

              console.log(`API Key: ${apiKey}`);
              console.log(`Token: ${token}`);

              const cardId = card.id;
              const url = `https://api.trello.com/1/cards/${cardId}/labels?key=${apiKey}&token=${token}`;
              const data = {
                color: 'green',
                name: 'Complete'
              };

              return fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then(function(response) {
                if (!response.ok) throw new Error('Network response was not ok');
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
};

window.TrelloPowerUp.initialize({
  'card-detail-badges': function (t) {
    // return an array of cards that adds Complete Badge
    return getCompleteDetailBadge(t);
  }
});