import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerPreview({avatar, username, children}){
    return (
        <div>
            <div className='column'>
                <img className='avatar'
                    src={avatar}
                    alt={'Avatar for ' + username}></img>
                <h2 className='username'>@{username}</h2>
            </div>
            {/* <button className='reset' onClick={props.onReset.bind(null, props.id)}>Reset</button> */}
            {children}
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired
}

// module.exports = PlayerPreview;
// export default PlayerPreview;