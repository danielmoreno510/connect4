import { Color } from "../types";

export interface DropCoinAction {
  type: "DROP_COIN";
  payload: {
    column: number;
    color: Color;
  };
}

export interface RestoreBoard {
  type: "RESTORE_BOARD";
}

export function dropCoin(column: number, color: Color): DropCoinAction {
  return {
    type: "DROP_COIN",
    payload: { column, color }
  };
}

export function restoreBoard(): RestoreBoard {
  return {
    type: "RESTORE_BOARD",
  };
}