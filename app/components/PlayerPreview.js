var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props){
    return (
        <div>
            <div className='column'>
                <img className='avatar'
                    src={props.avatar}
                    alt={'Avatar for ' + props.username}></img>
                <h2 className='username'>@{props.username}</h2>
            </div>
            {/* <button className='reset' onClick={props.onReset.bind(null, props.id)}>Reset</button> */}
            {props.children}
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired
}

module.exports = PlayerPreview;