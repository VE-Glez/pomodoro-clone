//import icons
import { FaPlay, FaPause } from "react-icons/fa";
import { RiSkipForwardFill, RiCloseFill } from "react-icons/ri";
import {
  HiVolumeUp,
  HiMenuAlt4,
  HiOutlineInformationCircle,
} from "react-icons/hi";

//import react hooks
import { useState, useEffect, useContext, useReducer } from "react";

//import logic for useReducer
import {
  allPomodoroStates,
  pomodoroReducer,
  types,
  settingsReducer,
  typesSlidersSettings,
} from "./reducer";

//import styled components
import {
  Menu,
  HiddenMenu,
  PomodoroHeader,
  PomodoroFooter,
  CountDown,
  Clock,
  PomodoroWrapper,
  Control,
} from "./styles";

//import components
import { TimeSettings, MoreSettings } from "../index";

//import contexts
import { AllThemes } from "../../context/themes/themes";
import { MenuActualView } from "../../context/layout";
import Slider from "../Slider";

const Pomodoro = () => {
  //using context for hidden menu display and for themes
  const { myTheme, getDark, getLight } = useContext(AllThemes);
  const { myView } = useContext(MenuActualView);

  const [myPomodoroState, pomodoroDispatch] = useReducer(
    pomodoroReducer,
    allPomodoroStates
  );

  const [globlalSettings, settingsDispatch] = useReducer(
    settingsReducer,
    allPomodoroStates.defaultSettings
  );
  let timer = myPomodoroState.actualTimer;
  // const [timer, setTimer] = useState({
  //   minutes: 25, //slider Math.floor and this%value
  //   seconds: 0,
  //   playing: false,
  //   phase: 1,
  // });
  const [autoPlay, setAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  var percentage = ((timer.minutes * 60 + timer.seconds) * 100) / (25 * 60);

  const handlePomodoroStage = (initialState) => {
    let minutes = initialState.minutes;
    let seconds = initialState.seconds;
    seconds = seconds - 1;
    if (seconds < 0) {
      minutes = minutes - 1;
      if (minutes < 0) {
        return pomodoroDispatch({
          type: types.CHANGE_PHASE,
          payload: autoPlay,
        });
      }
      seconds = 59;
    }
    return {
      ...initialState,
      minutes: minutes,
      seconds: seconds,
    };
  };

  useEffect(() => {
    if (timer.playing) {
      var c = setInterval(() => {
        // setTimer((pS) => handlePomodoroStage(pS));
        pomodoroDispatch({
          type: types.UPDATING_CURRENT_PHASE,
          payload: handlePomodoroStage(timer),
        });
      }, 100);
    }
    return () => {
      clearInterval(c);
    };
  }, [timer.playing, timer.seconds]);

  const handlePlay = (e) => {
    // setTimer({ ...timer, playing: !timer.playing });
    pomodoroDispatch({ type: types.PLAY_PAUSE });
    console.log(
      `estoy cambiando timer.playing de ${timer.playing} a ${!timer.playing}`
    );
  };

  const [cambio, setCambio] = useState(0);
  const handleSliderChange = (e) => {
    //NO FUNCIONA FALTA EXPORTAR UN OBJETO CON TODOS LOS SETTINGS DE SLIDERS
    console.log(
      "global settings (before): ",
      globlalSettings,
      `AND CAMBIO: ${cambio} AND NAME: ${e.target.name}`
    );
    const cambioPromise = new Promise((resolver, reject) => {
      setCambio((pv) => pv + 1);
      console.log(`movimiento número (inside) ${cambio}`);
    });
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        settingsDispatch({ type: e.target.name, payload: e.target.value });
      }, 50);
    });

    cambioPromise
      .then(console.log(`movimiento numero (OUTSIDE) ${cambio}`))
      .then(myPromise)
      .then(
        pomodoroDispatch({
          type: types.UPDATE_SETTINGS,
          payload: globlalSettings,
        })
      );

    console.log("global settings(after): ", globlalSettings);
  };

  return (
    <PomodoroWrapper theme={myTheme}>
      <PomodoroHeader theme={myTheme}>
        <Menu theme={myTheme} click={isVisible}>
          {isVisible ? (
            <RiCloseFill onClick={() => setIsVisible(!isVisible)} />
          ) : (
            <HiMenuAlt4 onClick={() => setIsVisible(!isVisible)} />
          )}
        </Menu>
        <h2>Pomodoro</h2>
        <HiOutlineInformationCircle />
      </PomodoroHeader>
      <HiddenMenu theme={myTheme} actualPosition={myView} clicked={isVisible}>
        <div className="settings timeSettings">
          <TimeSettings
            title="timer"
            defaultTime={`${myPomodoroState.defaultSettings.timer}:00`}
          >
            <Slider
              name={typesSlidersSettings.TIMER}
              initial={myPomodoroState.defaultSettings.timer}
              color={myTheme.color_timer}
              onInput={handleSliderChange}
            />
          </TimeSettings>
          <TimeSettings
            title="Descanso corto"
            defaultTime={`${myPomodoroState.defaultSettings.short_break}:00`}
          >
            <Slider
              name={typesSlidersSettings.SHORT_BREAK}
              initial={myPomodoroState.defaultSettings.short_break}
              color={myTheme.color_short_break}
              onInput={handleSliderChange}
            />
          </TimeSettings>
          <TimeSettings
            title="Descanso largo"
            defaultTime={`${myPomodoroState.defaultSettings.long_break}:00`}
          >
            <Slider
              name={typesSlidersSettings.LONG_BREAK}
              initial={myPomodoroState.defaultSettings.long_break}
              color={myTheme.color_long_break}
              onInput={handleSliderChange}
            />
          </TimeSettings>
          <TimeSettings
            title="Rondas"
            defaultTime={`${myPomodoroState.defaultSettings.rounds}`}
          >
            <Slider
              name={typesSlidersSettings.ROUND}
              initial={myPomodoroState.defaultSettings.rounds}
              color={myTheme.color_rounds}
              onInput={handleSliderChange}
              max={10}
            />
          </TimeSettings>

          <button
            onClick={() => {
              console.log("BOTON REINICIO DE ESTADOS", globlalSettings);
              pomodoroDispatch({ type: types.RESET_DEFAULT_SETTINGS });
            }}
          >
            Reset defaults
          </button>
        </div>
        <div className="settings appSettings">
          <h3>Configuraciones de este lugar</h3>
          <ul>
            <li>always on top</li>
            <li>
              Auto-start next phase
              <input type="checkbox" onInput={() => setAutoPlay(!autoPlay)} />
            </li>

            <li>Tick sounds</li>
            <li>Desktop notification</li>
          </ul>
        </div>
        <div className="settings themeSettings">
          <button className="darkTheme" onClick={getDark}>
            Dark theme
          </button>
          <p>Welcome to the {myTheme.title}</p>
          <button className="lighTheme" onClick={getLight}>
            Light theme
          </button>
        </div>
        <div className="settings about">
          <h3>Credits</h3>
          <p>This app has been created with React 17.0.1</p>
          <p>Made by Valentin Eduardo Gonzalez Morales</p>
          <p>Inspired in "Pomotroid" (a pomodoro app for linux)</p>
        </div>
      </HiddenMenu>
      <MoreSettings click={isVisible} theme={myTheme} />
      <Clock theme={myTheme} valor={`${100 - percentage}%`}>
        <div className="elements-wrapper">
          <CountDown>
            {timer.minutes}:
            {timer.seconds < 10 ? "0" + timer.seconds : timer.seconds}
          </CountDown>
          <p>FOCUS</p>
        </div>
      </Clock>
      <Control theme={myTheme} onClick={handlePlay}>
        {timer.playing ? <FaPause /> : <FaPlay />}
      </Control>
      <PomodoroFooter theme={myTheme}>
        <div className="lap">
          <p>{myPomodoroState.actualRound}/4</p>
          <button>Reset</button>
        </div>
        <div className="secondaryControls">
          <RiSkipForwardFill />
          <HiVolumeUp />
        </div>
      </PomodoroFooter>
    </PomodoroWrapper>
  );
};

export default Pomodoro;
