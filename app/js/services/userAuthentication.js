'use strict';

var userAuthentication = {
    login: function (data) {
        sessionStorage['currentUser'] = JSON.stringify(data);
    },
    getCurrentUser: function () {
        var userData = sessionStorage['currentUser'];
        if (userData) {
            return JSON.parse(sessionStorage['currentUser']);
        }
    },

    getCurrentUsername: function(){
        var userData = userAuthentication.getCurrentUser();
        return userData.username;
    },

    logout: function () {
        delete sessionStorage['currentUser'];
    }
};