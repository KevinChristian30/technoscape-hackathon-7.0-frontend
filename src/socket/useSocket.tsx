import { useEffect, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketProps {
    serverUrl: string;
}

const useSocket = ({ serverUrl }: SocketProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    const initSocket = useCallback(() => {
        const newSocket = io(serverUrl);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [serverUrl]);

    useEffect(() => {
        initSocket();
    }, [initSocket]);

    return socket;
};

export default useSocket;