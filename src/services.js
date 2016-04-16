
import fetch from 'isomorphic-fetch';

var pattern = {
    username: /^[\w\d-]+$/i,
    email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i
};

var validation = {
    validateUsernamePassword: function(username, password) {
        var message = "";
        if (username == "" && password == "") message = "Username and password are empty.";
        else if (username == "") message = "Username is empty.";
        else if (password == "") message = "Password is empty.";
        else if (!username.match(pattern.username)) message = "Username invaid.";
        else message = 'pass';
        return message;
    }
};

var fetchOptions = function(data) {
    var debug = process.env.NODE_ENV !== 'production';
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    };
    if (!debug) options.credentials = 'include';
    return options;
}

var getFetch = function(url, data) {
    var debug = process.env.NODE_ENV !== 'production';
    var options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    };
    if (debug) url = 'http://localhost:3000' + url;
    else options.credentials = 'include';
    return fetch(url, options);
}

export { pattern, validation, getFetch };
