export interface RestoreBoard {
  type: "RESTORE_BOARD";
}

export function restoreBoard(): RestoreBoard {
  return {
    type: "RESTORE_BOARD",
  };
}