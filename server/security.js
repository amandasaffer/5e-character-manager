Security.defineMethod("ifCreated", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId && doc.userId !== userId;;
  }
});

Characters.permit('insert').ifLoggedIn().apply();
Characters.permit('update').exceptProps(['userId', 'owner', 'updated']).ifHasUserId('userId').apply();
Characters.permit('remove').ifLoggedIn().ifCreated().apply();
