export type PlayerType = {
  id: string;
  name: string;
  wins: number;
  losses: number;
  draws: number;
};

export type BoardType = {
  squares: (PlayerType["id"] | undefined)[][];
};
