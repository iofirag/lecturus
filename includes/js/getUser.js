var userMail;

$(document).ready(function() {
	// on ready document code
});

/* login callback */
function signinCallback(authResult) {
	if (authResult['status']['signed_in']) {
		// Update the app to reflect a signed in user
		// Hide the sign-in button now that the user is authorized, for example:
		document.getElementById('signinButton').setAttribute('style', 'display: none');

		// Client object has been created.
		gapi.client.load('plus', 'v1', function() {
			var request = gapi.client.plus.people.get({
				'userId' : 'me'
			});
			request.execute(function(resp) {
				/* get user mail */
				userMail = handleEmailResponse(resp);

				/* get lectures of user */
				get_lectures_by_usermail(userMail);
			});
		});
	} else {
		// Update the app to reflect a signed out user
		// Possible error values:
		//   "user_signed_out" - User is signed-out
		//   "access_denied" - User denied access to your app
		//   "immediate_failed" - Could not automatically log in the user
		console.log('Sign-in state: ' + authResult['error']);
	}
}

function handleEmailResponse(resp) {
	var primaryEmail;
	for (var i = 0; i < resp.emails.length; i++) {
		if (resp.emails[i].type === 'account')
			primaryEmail = resp.emails[i].value;
	}
	document.getElementById('responseContainer').value = 'Primary email: ' + primaryEmail/*+ '\n\nFull Response:\n' + JSON.stringify(resp)*/;
	return primaryEmail;
}

function get_lectures_by_usermail(mail) {
	// for test
	$.ajax({
		type: "POST",
		url : "http://lecturus.herokuapp.com/users/getUser",
		data : {
			id : userMail
		},
		dataType : 'jsonp',
		success : function(res) {
			// do stuff with json (in this case an array)
			// alert("Success");
			debugger;
			console.log("response (post): ", JSON.parse(res)[0]);
			console.log(res);
		},
		error : function(res, error) {
			console.log(res);
			console.log("Can't do because: " + error);
		}
	});
}
