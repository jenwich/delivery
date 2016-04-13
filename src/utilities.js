
var pattern = {
    username: /^[\w\d-]+$/i
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

export { pattern, validation };
