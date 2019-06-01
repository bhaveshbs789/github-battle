import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';


class PlayerInput extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    }

    static defaultProps = {
        label: 'Username'
    }

    state = {
        username:''
    }

    // triggered when the input field value changes
    handleChange = (event) => {
        const value = event.target.value;
        this.setState(() => ({username: value}))
    }

    handleSubmit = (event) => {
        event.preventDefault(); // prevent default to NOT send it to some server
        // The below onSubmit is called from the props passed to PlayerInput component
        // which is called with the props.id and the username from the ste property in 
        //PlayerInput component.
        this.props.onSubmit(this.props.id, this.state.username)
    }

    render(){
        const {username} = this.state;
        const {label} = this.props;
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>{label}</label>
                <input id='username' type='text' 
                    placeholder='github username' 
                    autoComplete='off' 
                    value={username}
                    onChange={this.handleChange}></input>
                    <button
                        className='button'
                        type='submit'
                        disabled={!username}>Submit</button>
            </form>
        )
    }
}


class Battle extends React.Component {

    state = {
        playerOneName:'',
        playerTwoName:'',
        playerOneImage: null,
        playerTwoImage: null
    }
    // For the handleSubmit method we are passing two parameters
    // id and username. If id is playerOne then update the playerOne 
    // name and Image or else otherwise.
    handleSubmit = (id, username) => {
        this.setState(() => ({
            [id + 'Name'] : username,
            [id + 'Image'] : `https://github.com/${username}.png?size=200`
        }))
    }

    handleReset = (id) => {
        this.setState(() => ({
            [id + 'Name'] : '',
            [id + 'Image'] : null
        }))
    }

    render(){
        // Post rendering the props being passed to this component
        // is match, location and history
        // https://reacttraining.com/react-router/web/api/Link/to-object
        const {match} = this.props;
        const {playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state;

        return (
            <div>
                <div className="row">
                    {!playerOneName && <PlayerInput id='playerOne' label='Player One' onSubmit={this.handleSubmit}/>}
                    {playerOneImage !== null && <PlayerPreview avatar={playerOneImage}
                                                    username={playerOneName}
                                                    onReset={this.handleReset}
                                                    >
                                                    <button className='reset' onClick={() => this.handleReset('playerOne')}>Reset</button>
                                                    </PlayerPreview>}
                    {!playerTwoName && <PlayerInput id='playerTwo' label='Player Two' onSubmit={this.handleSubmit}/>}
                    {playerTwoImage !== null && <PlayerPreview avatar={playerTwoImage}
                                                    username={playerTwoName}
                                                    onReset={this.handleReset}
                                                    >
                                                    <button className='reset' onClick={() => this.handleReset('playerTwo')}>Reset</button>
                                                    </PlayerPreview>}
                </div>

                {/* {playerOneImage && playerTwoImage &&
                <Link 
                    className='button' to={{
                    pathname: match.url + '/results',
                    search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                    }}>Battle</Link>
                } */}

                {playerOneImage && playerTwoImage &&
                <Link
                    className='button'
                    to={{
                    pathname: match.url + '/results',
                    search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                    }}>
                    Battle
                </Link>}
            </div>
        )
    }
}

// module.exports = Battle;
export default Battle;