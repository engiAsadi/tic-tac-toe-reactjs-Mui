import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  root: {
    
    border: 2,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'black',
    height: 98,
    // padding: '0 90px',
    width: 98,
    
  },
});

export default function Hook(props) {

  const classes = useStyles();
  return <Button className={classes.root} 
                  onClick={ ()=>
                    props.onClick()
                    }>{props.value}
                    </Button>;
}



function checkWining(squares) {

  const winLines = [[0,1,2],[3,4,5],[6,7,8],
  [0,4,8],[2,4,6],[0,3,6],
  [1,4,7],[2,5,8]];

  for (let index = 0; index < winLines.length; index++) {
    const [a,b,c] = winLines[index];
    if (squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]) {
      return squares[a];
    }
  }
  return false;
}

// function bestMove(squares) {
  
//   let bestMove=-Infinity;
//   let score;
//   for (let index = 0; index < squares.length; index++) {
//     const isAvailableSpot = squares[index];
//     if (isAvailableSpot!==null) {
//       squares[index]='O';
//       return squares;
//     }
//   }


// }

  class Board extends React.Component {

    
    

    renderSquare(i) {
      return(
              <Hook 
                value={this.props.squares[i]}
                onClick={()=>{this.props.onClick(i)}
                }
              />
            );
    }

    // aiMove() {
    //       let newSquares=bestMove(this.state.squares);
    //       const squares = this.state.squares.slice();
    //       this.setState({squares,newSquares});
    // }
  
    render() {
 
      
      // if (check) {
      //    status =" the winner is "+ check;
      // }else{
      //    status = 'Next player: '+(this.state.xTurn ? 'X':'O');
      //    if (this.state.xTurn===false) {
           
           
      //    }
      // }

      return (
        
          
        <Container wrap="nowrap">
          <Grid container wrap="nowrap" direction="row"  justify="center" alignItems="center">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </Grid>
          <Grid  container wrap="nowrap" direction="row" justify="center" alignItems="center">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </Grid>
          <Grid  container wrap="nowrap" direction="row" justify="center" alignItems="center">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </Grid>
        </Container>  
          
        

        
        
      );
    }

    
  }
  
  class Game extends React.Component {

    constructor(props){
      super(props);
      this.state={
        history:[{
          squares: Array(9).fill(null),
        }],
        xTurn: true,
        stepNumber:0,
      };
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xTurn: (step%2)=== 0
      });
    }
    handleClick(i){
      const history = this.state.history.slice(0,this.state.stepNumber + 1);
      const current = history[history.length -1];
      const squares = current.squares.slice();
      
      if (checkWining(squares)||squares[i]) {
        return;
      }
      squares[i]=this.state.xTurn ? 'X':'O';
      this.setState({
        history : history.concat([{
          squares : squares,
        }]),
        xTurn: !this.state.xTurn,
        stepNumber:history.length,
      });
    }


    render() {
      const welcomeText = " X O Game developed by ali asadi";
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = checkWining(current.squares);
      let status;
      if(winner){
        status = 'winner is :'+winner
      }else{
        status = 'next player is : '+(this.state.xTurn ? 'X' : 'O');
      }

      const moves = history.map((step, move)=> {
        const desc = move ?
          'Go to move #' + move :
          'Reset the game';
        return(
          <li key={move}>
              <Hook 
                value={desc}
                onClick={()=>this.jumpTo(move)
                }
              />
          </li>
        );
      });
      return (
        <div className="css-selector">
          {/* <Grid container spacing={1} alignItems="center" > */}
          <Grid
            container  direction="column" justify="center" alignItems="center" >
            <div item className="grid"  >
                <Paper >
                  <Typography  variant="h3" justify="center" color="initial">{welcomeText}</Typography>
                </Paper>
            </div>
            <Board 
              squares={current.squares}
              onClick={(i) =>this.handleClick(i)}
              />
          
            <div item className="grid"  >
              <Paper >
                <Typography  variant="h3" justify="center" color="primary">{status}</Typography>
              </Paper>
            </div>
            <div item className="grid"  >
              {moves}
            </div>
          </Grid>

        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  