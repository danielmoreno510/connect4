import React, { useEffect, useState } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getBoard, getCurrentPlayer, getWinner } from "../reducers/selectors";
import { Row } from "./Row";
import { dropCoin } from "../actions/dropCoin";
import { restoreBoard } from "../actions/board";
import { Color } from "../types";

interface Props {
  board: ReturnType<typeof getBoard>;
  color: ReturnType<typeof getCurrentPlayer>;
  winner: ReturnType<typeof getWinner>;
  dropCoin: typeof dropCoin;
  restoreBoard: typeof restoreBoard;
}

export const BoardComponent = (props: Props) => {
  const [red, setRed] = useState(0);
  const [yellow, setYellow] = useState(0);

  useEffect(() => {
    if (props.winner) {
      if (props.winner.color === "red") {
        setRed(red + 1);
      } else {
        setYellow(yellow + 1);
      }
    }
  }, [props.winner]);

  const dropCoin = (column: number) => () => {
    // we only allow a player to drop a coin if there is no winner yet
    if (!props.winner) {
      props.dropCoin(column, props.color);
    }
  };

  const displayHeader = () => {
    // only display the winner if there is one
    if (props.winner) {
      return <h2>Congratulations, {props.winner.color} wins the game!</h2>;
    } else {
      return <h2>It's {props.color}'s turn to play</h2>;
    }
  };

  const displayRow = (colors: Color[], key: number) => {
    return (
      <Row
        row={key}
        dropCoin={dropCoin}
        colors={colors}
        key={`column-${key}`}
        winner={props.winner}
      />
    );
  };

  const restoreBoard = () => props.restoreBoard();

  const classes = cn("Game-Board");
  const button = cn("Button");

  const messageButton = props.winner ? "play again" : "start over";
  const backgroundColor = props.winner ? "green" : "red";

  return (
    <>
      {displayHeader()}
      <div className="Game">
        <div className={classes}>{props.board.map(displayRow)}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Red</th>
            <th>Yellow</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{red} {red === 1 ? 'win' : 'wins'}</td>
            <td>{yellow} {yellow === 1 ? 'win' : 'wins'}</td>
          </tr>
        </tbody>
      </table>
      <button
        data-testid="restore-button"
        className={button}
        style={{ backgroundColor }}
        onClick={restoreBoard}
      >
        {" "}
        {messageButton}
      </button>
    </>
  );
};

const mapState = (state: RootState) => ({
  board: getBoard(state),
  color: getCurrentPlayer(state),
  winner: getWinner(state),
});

export const Board = connect(mapState, { dropCoin, restoreBoard })(
  BoardComponent
);
