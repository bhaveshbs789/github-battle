import React from 'react';
// import axios from 'axios';

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_CLIENT_SECRET";
const params = `?client_id=${id}&client_secret=${sec}`; // Template string
// Changed the var keyword for the above lines to const as
// it would not change

// Takes in a username and returns the details fetched from the github api
async function getProfile(username){
    const response = await fetch(`https://api.github.com/users/${username}${params}`);
    //return username.data; Here we also use object destructuring
    return response.json();
}

// getRepos takes in a username and returns the repos for that username
async function getRepos(username){
    const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
    return response.json();
}

// getStarCount returns the starCount for an array of repos passed as a parameter
function getStarCount(repos){
    return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0);
}

// calculateScore function takes in the profile and the user repos
// and returns the total of the followers times 3 added to totalStars
function calculateScore({followers}, repos){
    return (followers * 3) + getStarCount(repos);
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
async function getUserData(player){
    const [profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player)
    ]);
    
    return {
            profile,
            score: calculateScore(profile, repos)
    }
}

// the below sortPlayers function takes in a array of players and returns
// sorted details
function sortPlayers(players){
    return players.sort((a, b) => b.score - a.score);
}

// with module.exports we are only exporting an object which would have some 
// method and properties
// ES6 imports and exports syntax

export async function battle(players){
    const results = await Promise.all(players.map(getUserData))
        .catch(handleError);
    
    return results === null
    ? results
    : sortPlayers(results)
}

export async function fetchPopularRepos(language){
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    const response = await fetch(encodedURI).catch(handleError);
    const repos = await response.json();
    return repos.items;
}

// module.exports = {
//     battle(players){
//         return Promise.all(players.map(getUserData))
//             .then(sortPlayers)
//             .catch(handleError)
//     },
//     fetchPopularRepos(language){ // the method takes a language and performs a axios GET request
//         const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
//         return axios.get(encodedURI).then(({data})=> data.items)
//             //console.log(response); // response is an object which gets returned
//     }
// }


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