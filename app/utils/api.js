var React = require('react');
var axios = require('axios');

// with module.exports we are only exporting an object which would have some 
// method and properties

module.exports = {
    fetchPopularRepos: function(language){ // the method takes a language and performs a axios GET request
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI).then(function(response){
            //console.log(response); // response is an object which gets returned
            return response.data.items;
        })
    }
}
