import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api';
import Loading from './Loading';

function SelectLanguage({selectedLanguage,onSelect}){
    var languages = ['All','JavaScript','Ruby','Java','CSS','Python'];
    return (
        <ul className='languages'>
            {languages.map((language) => {
                return (
                    <li 
                        style={language === selectedLanguage ? {color:  '#d0021b'} : null}
                        onClick={() => onSelect(language)}
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

function ReposGrid({repos}){
    return (
        <ul className='popular-list'>
            {repos.map(({name, stargazers_count, owner, html_url}, index)=> (
                    <li key={name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img className='avatar'
                                src={owner.avatar_url}
                                alt={'Repo for ' + owner.login} />
                            </li>
                            <li>
                                <a href={html_url}>{name}</a>
                            </li>
                            <li>@{owner.login}</li>
                            <li>{stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            )}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos : PropTypes.array.isRequired
}

class Popular extends React.Component {
   
    state = {
        selectedLanguage : 'All',
        repos:null
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage = async (language) => {
        this.setState(() => (
            {
                selectedLanguage: language,
                repos: null
            }
        ));
        // the api call would be made from here as whenever the updated
        // language is clicked the this.setState is to be called
        // and repos property is to be reset to null and selectedLanguage needs
        // to be passed to the updateLanguage method
        const repos = await fetchPopularRepos(language);
        this.setState(() => ({repos}))
     }

    render(){
        const {selectedLanguage, repos} = this.state;
        return (
            <div>
                <SelectLanguage 
                    selectedLanguage={selectedLanguage}
                    onSelect={this.updateLanguage} />
                {!repos ? <Loading/> : 
                <ReposGrid repos={repos} />}
            </div>
        )
    }
}

// module.exports = Popular;
export default Popular;