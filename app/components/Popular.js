var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage(props){
    var languages = ['All','JavaScript','Ruby','Java','CSS','Python'];
    return (
        <ul className='languages'>
            {languages.map(function(language){
                return (
                    <li 
                        style={language === props.selectedLanguage ? {color:  '#d0021b'} : null}
                        onClick={props.onSelect.bind(null, language)}
                        key={language}>
                        {language}
                    </li>
                )
            })}
        </ul> 
    )
}



SelectLanguage.propTypes = {
    selectedLanguage : PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

function ReposGrid(props){
    return (
        <ul className='popular-list'>
            {props.repos.map(function(repo, index){
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img className='avatar'
                                src={repo.owner.avatar_url}
                                alt={'Repo for ' + repo.owner.login} />
                            </li>
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos : PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage : 'All',
            repos:null // the Repos has been added as new property on the state which would contain the list of repos returned from axios.get in api.js under utils
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(language){
        this.setState(function(){
            return {
                selectedLanguage: language,
                repos: null
            }
        });
        // the api call would be made from here as whenever the updated
        // language is clicked the this.setState is to be called
        // and repos property is to be reset to null and selectedLanguage needs
        // to be passed to the updateLanguage method
        api.fetchPopularRepos(language).then(function(repos){
            console.log(repos);
            this.setState(function(){
                return {
                    repos: repos
                }
            })
        }.bind(this))
    }
    render(){
        
        return (
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} />
                {!this.state.repos ? <Loading/> : 
                <ReposGrid repos={this.state.repos} />}
            </div>
        )
    }
}

module.exports = Popular;