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
import { allPomodoroStates, pomodoroReducer, types } from "./reducer";

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

  let timer = myPomodoroState.actualTimer;

  const [autoPlay, setAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  // var percentage = ((timer.minutes * 60 + timer.seconds) * 100) / (25 * 60);
  //percentage sirve para cambio dinamico a la velocidad del timer
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
    pomodoroDispatch({ type: types.PLAY_PAUSE });
    console.log(
      `estoy cambiando timer.playing de ${timer.playing} a ${!timer.playing}`
    );
  };

  const handleSliderChange = (e) => {
    pomodoroDispatch({
      type: types.UPDATE_SETTINGS,
      payload: [e.target.name, e.target.value],
    });
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
              name={types.TIMER}
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
              name={types.SHORT_BREAK}
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
              name={types.LONG_BREAK}
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
              name={types.ROUND}
              initial={myPomodoroState.defaultSettings.rounds}
              color={myTheme.color_rounds}
              onInput={handleSliderChange}
              max={10}
            />
          </TimeSettings>

          <button
            onClick={() => {
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
      <Clock theme={myTheme} /*valor={`${100 - percentage}%`}*/>
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
