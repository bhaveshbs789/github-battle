var React = require('react');

class Battle extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            playerOneName:'',
            playerTwoName:'',
            playerOneImage: null,
            playerTwoImage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // For the handleSubmit method we are passing two parameters
    // id and username. If id is playerOne then update the playerOne 
    // name and Image or else otherwise.
    handleSubmit(id, username){
        this.setState(function(){
            var newState = {
            }
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + uername + '.png?size=200';
            return newState;
        })
    }

    render(){
        return (
            <div>
                <div className="row">
                    
                </div>
            </div>
        )
    }
}

module.exports = Battle;