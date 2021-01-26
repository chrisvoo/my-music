import React, { Fragment } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
// import 'react-jinke-music-player/assets/index.css';
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
        audioLists={[
          {
            name: "Don't know why",
            musicSrc: 'http://localhost:3001/play/600fdfddbeb062cc509b80b0',
            duration: 186,
          },
        ]}
        theme="dark"
        locale="en_US"
        mode="full"
        showThemeSwitch={false}
        responsive={false}
        defaultPosition={{ bottom: 0, left: 0 }}
      />
    </>
  );
}

export default App;
