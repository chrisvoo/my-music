import React, { Fragment } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import './player.css';
import './custom_player.css';
import { Header } from './navbar/Header';
import { Main } from './main/Main';

function App() {
  return (
    <>
      <Header />
      <Main />
      <ReactJkMusicPlayer
        autoPlay={false}
        remember={false}
        preload={false}
        mode="full"
        responsive={false} // always show bottom bar
        toggleMode={false} // mini-full
        defaultVolume={0.5}
        showDownload={false}
        showThemeSwitch={false}
        autoHiddenCover // Auto hide the cover photo if no cover photo is available (bool)
        spaceBar // Play and pause audio through space bar （Desktop effective）
        quietUpdate // Don't interrupt current playing state when audio list updated
        showDestroy={false} // Destroy player button display
        onAudioListsPanelChange={(panelVisible: boolean) => {
          console.log(panelVisible);
        }}
        audioLists={[
          {
            name: 'Behind blue eyes',
            duration: 271,
            musicSrc: 'http://localhost:3001/play/600fdfddbeb062cc509b809e',
            singer: 'Limp Bizkit',
          },
        ]}
      />
    </>
  );
}

export default App;
