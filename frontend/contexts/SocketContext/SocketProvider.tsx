import { WEBSOCKET_URL } from '@env';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { MessageSchema } from './schema';
import { SocketContext } from './SocketContext';
import { GraphsData, SocketContextType } from './types';

const numberOfPoints = 60;

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [xValues, setXValues] = useState<number[]>([]);
  const [graphsData, setGraphsData] = useState<GraphsData>({
    fuel: [],
    speed: [],
    co2: [],
  });
  const [counters, setCounters] = useState({
    samplePoints: 0,
    fuelConsumption: 0,
    averageSpeed: 0,
    co2Emissions: 0,
  });

  useEffect(() => {
    const newSocket = new WebSocket(WEBSOCKET_URL);

    newSocket.onopen = () => {
      setSocket(newSocket);
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      if (!event) return;
      const message = MessageSchema.safeParse(JSON.parse(event.data));

      if (message.success) {
        setXValues((state) => {
          const newVal = (state[state.length - 1] || 0) + 0.25;

          state.push(newVal);
          if (state.length === numberOfPoints) {
            state.shift();
          }
          return state;
        });
        setGraphsData((state) => ({
          fuel: [
            ...state.fuel.slice(-numberOfPoints + 1),
            parseInt(message.data.fuelCurrent.toFixed(2), 10),
          ],
          speed: [
            ...state.speed.slice(-numberOfPoints + 1),
            parseInt(message.data.speed.toFixed(2), 10),
          ],
          co2: [
            ...state.co2.slice(-numberOfPoints + 1),
            parseInt(message.data.co2Current.toFixed(2), 10),
          ],
        }));

        setCounters((state) => ({
          ...state,
          samplePoints: state.samplePoints + 1,
          fuelConsumption: state.fuelConsumption + message.data.fuelCurrent,
          averageSpeed:
            (state.averageSpeed + message.data.speed) /
            (state.samplePoints + 1),
          co2Emissions: state.co2Emissions + message.data.co2Current,
        }));
      }
    };

    newSocket.onerror = (error) => {
      // eslint-disable-next-line no-console
      console.error('WebSocket error:', error);
    };

    newSocket.onclose = () => {
      setSocket(null);
      setIsConnected(false);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const value: SocketContextType = useMemo(
    () => ({
      socket,
      isConnected,
      setIsConnected,
      graphsData,
      xValues,
      setGraphsData,
      numberOfPoints,
      counters,
    }),
    [socket, isConnected, graphsData, xValues, counters],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
