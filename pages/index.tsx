import { Inter } from 'next/font/google';

import Nav from '@/components/nav';
import styles from '@/styles/Home.module.css';
import { populateBluetoothDevices, getNearbyDevices } from '@/services/bweTest';
import React, { useState, useEffect, useCallback } from 'react';
import DeviceTable from '@/components/DeviceTable';
import { VoiceRecorder } from 'react-voice-recorder-player';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  const getBleDevices = useCallback(async () => {
    let response = await populateBluetoothDevices();
    console.log(response);
    setDevices(response);
  }, []);

  useEffect(() => {
    getBleDevices();
  }, [getBleDevices]);

  return (
    <>
      <Nav />

      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            <code className={styles.code}> PWA PWE APP TESTER</code>
          </p>
          <input
            type="button"
            onClick={getNearbyDevices}
            value="Scan for local stalker targets."
          ></input>
          <VoiceRecorder /> <br></br>
        </div>
        <div className={styles.center}>
          {devices.length > 0 && <DeviceTable devices={devices}></DeviceTable>}
        </div>
      </main>
    </>
  );
}
