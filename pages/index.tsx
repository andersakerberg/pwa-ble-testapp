import Nav from '@/components/nav';
import styles from '@/styles/Home.module.css';
import { populateBluetoothDevices, getNearbyDevices } from '@/services/bweTest';
import React, { useState, useEffect, useCallback } from 'react';
import DeviceTable from '@/components/DeviceTable';
import { AudioRecorder } from 'react-audio-voice-recorder';

const addAudioElement = (blob: Blob | MediaSource) => {
  const url = URL.createObjectURL(blob);
  const audio = document.createElement('audio');
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);
};

export default function Home() {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  const getBleDevices = useCallback(async () => {
    let response = await populateBluetoothDevices();
    setDevices(response);
  }, []);

  useEffect(() => {
    getBleDevices();
  }, [getBleDevices]);

  return (
    <>
      <Nav />

      <main className={`${styles.main}`}>
        <div className={styles.description}>
          <p>
            <code className={styles.code}> PWA PWE APP TESTER</code>
          </p>
          <input
            type="button"
            onClick={getNearbyDevices}
            value="Scan for local stalker targets."
          ></input>
        </div>
        {devices.length > 0 && <DeviceTable devices={devices}></DeviceTable>}
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadOnSavePress={true}
          downloadFileExtension="webm"
        />
      </main>
    </>
  );
}
