console.log("Hello World!")

window.TrelloPowerUp.initialize({
  "card-detail-badges": function (t, opts) {
    return t
      .card("name")
      .get("name")
      .then(function (cardName) {
        console.log("We just loaded the card name for fun: " + cardName);

        return [
          {
            // its best to use static badges unless you need your badges
            // to refresh you can mix and match between static and dynamic
            title: "Complete Button",
            text: "Complete",
            color: Green,
          },
        ];
      });
  },
});
