import database from "./firebase";

function get(uid) {
  return database
    .ref(`users/${uid}/expenses`)
    .once("value")
    .then(snapshot => {
      const expenses = [];

      snapshot.forEach(childSnapshot => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      return expenses;
    });
}

function update(uid, id, updates) {
  return database.ref(`users/${uid}/expenses/${id}`).update(updates);
}

function remove(uid, id) {
  database.ref(`users/${uid}/expenses/${id}`).remove();
}

function create(expense, uid) {
  return database
    .ref(`users/${uid}/expenses`)
    .push(expense)
    .then(ref => ref.key);
}

export { get, update, remove, create };
