import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Button from '../components/Button'

interface ServerStatus {
  status: string;
}

interface Props {
  serverStatus: boolean;
}

const ServerStatus = ({ }: Props) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get<ServerStatus>(
          `${apiUrl}/health`
        );
        const serverStatus = response.data.status === 'OK';
        if (serverStatus) {
          router.push('/questions');
          setTimeout(() => {
            setIsLoading(false)
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false)
      }
    };
    checkServerStatus();
  }, [router]);

  const handleReload = () => {
    router.reload();
  };

  return (
    <div className='server-check'>
      {isLoading ? 
      (
        <div className='loading'>
        <Image src="/images/load.gif" alt="Loading image" width={100} height={100}/>
        <p>Verifying server status...</p>
        </div>
        )
      : (
            <>
              <Image src="/images/disconnected.svg" alt="Disconnected image" width={200} height={200}/>
              <p>The server is not available!</p>
              <Button functionButton={handleReload} title="Check Server"/>
            </>
      )}
    </div>
  );
};

export default ServerStatus;
