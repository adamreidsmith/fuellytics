export type SocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  graphsData: GraphsData;
  xValues: number[];
  setGraphsData: React.Dispatch<React.SetStateAction<GraphsData>>;
  numberOfPoints: number;
};

export type GraphsData = {
  fuel: number[];
  speed: number[];
  co2: number[];
};
