import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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
    padding: '0 90px',
    
    
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

// function Square(props) {

//       return (
        
//         <Button  variant='outlined'  
//                 onClick={ ()=>
//                 props.onClick()
//                 }>
//           {props.value}
//         </Button>
        
//       );
    
  
//   }


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



  class Board extends React.Component {

    constructor(props){
      super(props);
      this.state={
        squares: Array(9).fill(null),
        xTurn:true,
        
      };

    }
    
    handleClick(i){
      const squares = this.state.squares.slice();
      if (checkWining(squares)||squares[i]) {
        return;
      }
      squares[i]=this.state.xTurn ? 'X':'O';
      this.setState({squares,
      xTurn:!this.state.xTurn});
    }

    renderSquare(i) {
      return( <Hook 
              value={this.state.squares[i]}
              onClick={()=>{this.handleClick(i)}
              } />);
    }
  
    render() {
 
      
      const check=checkWining(this.state.squares);
      let status;
      const welcomeText = " X O Game developed by ali asadi";
      
      if (check) {
         status =" the winner is "+ check;
      }else{
         status = 'Next player: '+(this.state.xTurn ? 'X':'O');
      }

      return (
        <Grid
            container direction="column" justify="center" alignItems="center" >
          <div item className="grid"  >
              <Paper >
                <Typography  variant="h3" justify="center" color="initial">{welcomeText}</Typography>
              </Paper>
          </div>
          
          <Grid container direction="row" justify="center" alignItems="center">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </Grid>
          <div item className="grid"  >
            <Paper >
              <Typography  variant="h3" justify="center" color="primary">{status}
              </Typography>
            </Paper>
          </div>
        </Grid>

        
        
      );
    }

    
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="css-selector">
          <Grid container spacing={1} alignItems="center" >
            <Board />
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
  