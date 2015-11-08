Security.defineMethod("ifOwned", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId && doc.userId !== userId;;
  }
});

Characters.permit('insert').ifLoggedIn().apply();
Characters.permit('update').exceptProps(['userId', 'createdAt']).ifOwned().apply();
Characters.permit('remove').ifLoggedIn().ifOwned().apply();
