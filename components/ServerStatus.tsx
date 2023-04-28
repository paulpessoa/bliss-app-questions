import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Button from '../components/Button'
import { supabase } from '../lib/supabase'

const ServerStatus = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<boolean | null>(true);

  const checkServerStatus = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase.from('health').select('status');
      if (data && data.length && data[0].status === 'OK') {
        router.push('/questions');
        setTimeout(() => {
          setServerStatus(true);
          setIsLoading(false)
        }, 1500);
      } else {
        setIsLoading(false)
        setServerStatus(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setServerStatus(false)
    }
  };

  return (
    <div className='server-check'>
      {
        isLoading ? (
          <div className='loading'>
            <Image src="/images/load.gif" alt="Loading image" width={100} height={100} />
            <p>Verifying server status...</p>
          </div>
        ) : (
          !serverStatus ? (
            <>
              <Image src="/images/disconnected.svg" alt="Disconnected image" width={200} height={200} />
              <p>The server is not available!</p>
              <Button functionButton={checkServerStatus} title="Check Server" />
            </>
          ) :
            <>
              <p>Hey, Welcome!</p>
              <Image src="/images/check.svg" alt="Check image" width={250} height={250} />
              <Button functionButton={checkServerStatus} title="Check Server" />
            </>
        )}
    </div>
  );
};

export default ServerStatus;
