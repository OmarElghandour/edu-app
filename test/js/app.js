// replace these values with those generated in your TokBox Account
const apiKey = '46513982';


async function getDataFromUrl(){
    fetch('http://localhost:3000/token',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    }).then(function(response) {
        if (response.ok) {
            response.json().then(json => {
                initializeSession(json);
            });
        }
    });
}
getDataFromUrl();
// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}

// (optional) add server code here

function initializeSession(json) {
    var session = OT.initSession(apiKey, json.session);
    console.log(json.token)
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
    });

    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, handleError);

    // Connect to the session
    session.connect(json.token, function(error) {
        // If the connection is successful, initialize a publisher and publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });

    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
    });

}
