
module.exports = async function createOrUpdateDocument(docRef, playerfirstname, playerlastname, team, timevalue) {
    var getDoc = await docRef.get()
    .then(doc => {
        if (!doc.exists) {
            //console.log('Creating document for : ' + playerfirstname + " " + playerlastname );
            docRef.set({
              firstname: playerfirstname,
              lastname: playerlastname,
              team: team,
              values: [timevalue]
            });
        } else {
            //console.log('Updating document for :' + playerfirstname + " " + playerlastname);
            var newValueArr = doc.data().values;
            newValueArr.push(timevalue);
            docRef.update({
              values: newValueArr
            });
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
  }
  