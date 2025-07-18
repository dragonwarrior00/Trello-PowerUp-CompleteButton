var myPowerUp = {
    'card-buttons': function (t, options) {
        return [{
            icon: 'https://example.com/icon.png',
            text: 'Archive Card',
            callback: function (t) {
                return archiveCard(t);
            }
        }];
    }
};

function archiveCard(t) {
    return t.get('card', 'id').then(function (cardId) {
        return t.set('card', 'archived', true).then(function () {
            return t.closePopup();
        });
    }).catch(function (error) {
        console.error('Error archiving card:', error);
    });
}

TrelloPowerUp.initialize(myPowerUp);