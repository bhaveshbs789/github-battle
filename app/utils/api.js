var React = require('react');
var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_CLIENT_SECRET";
var params = "?client_id=" + id + "&client_secret=" + sec;

// Takes in a username and returns the details fetched from the github api
function getProfile(username){
    return axios.get('https://api.github.com/users/' + username + params)
        .then(function(user){
            return username.data;
        })
}

// getRepos takes in a username and returns the repos for that username
function getRepos(username){
    return axios.get('https://api.github.com/users/' + username + '/repos' +  params + '&per_page=100');
}

// getStarCount returns the starCount for an array of repos passed as a parameter
function getStarCount(repos){
    return repos.data.reduce(function(count, repo){
        return count + repo.stargazers_count;
    }, 0);
}

// calculateScore function takes in the profile and the user repos
// and returns the total of the followers times 3 added to totalStars
function calculateScore(profile, repos){
    var followers = profile.followers;
    var totalStars = getStarCount(repos);
    return (followers * 3) + totalStars;
}

// handleError function is to handler any errors which come in the api request
function handleError(error){
    console.warn(error);
    return null;
}

// The below function getUserData is a function composition for all the above
// declared functions. It takes in a player and gets the player details
// We use the axios.all function which takes in a array of promises and once all
// of them are fullfilled then the "then" function is called.
// axios.all once fullfilled returns a array of the responses .
function getUserData(){
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(){
        var profile = data[0];
        var repos = data[1];
        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}

// the below sortPlayers function takes in a array of players and returns
// sorted details
function sortPlayers(players){
    return players.sort(function(){
        return b.score - a.score;
    })
}

// with module.exports we are only exporting an object which would have some 
// method and properties

module.exports = {
    battle: function(players){
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
    fetchPopularRepos: function(language){ // the method takes a language and performs a axios GET request
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI).then(function(response){
            //console.log(response); // response is an object which gets returned
            return response.data.items;
        })
    }
}


// var axios = require('axios');

// module.exports = {
//   fetchPopularRepos: function (language) {
//     var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

//     return axios.get(encodedURI)
//       .then(function (response) {
//         return response.data.items;
//       });
//   }
// };