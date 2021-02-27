import { FaPlay, FaPause } from "react-icons/fa";
import { RiSkipForwardFill, RiCloseFill } from "react-icons/ri";
// import { InputRange } from "react-input-range";
import {
  HiVolumeUp,
  HiMenuAlt4,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import {
  Menu,
  PomodoroHeader,
  PomodoroFooter,
  CountDown,
  Clock,
  PomodoroWrapper,
  Control,
} from "./styles";

import { TimeSettings, MoreSettings } from "../index";

const Pomodoro = () => {
  const [timer, setTimer] = useState({
    minutes: 25, //slider Math.floor and this%value
    seconds: 0,
    playing: false,
    phase: 1,
  });

  const [options, setOptions] = useState(false);
  var percentage = ((timer.minutes * 60 + timer.seconds) * 100) / (25 * 60);

  const handlePomodoroStage = (initialState) => {
    let minutes = initialState.minutes;
    let seconds = initialState.seconds;
    seconds = seconds - 1;
    if (seconds < 0) {
      minutes = minutes - 1;
      if (minutes < 0) {
        return {
          minutes: 0,
          seconds: 0,
          playing: false,
          phase: initialState.phase + 1,
        };
      }
      seconds = 59;
    }
    return {
      minutes: minutes,
      seconds: seconds,
      playing: true,
      phase: initialState.phase,
    };
  };

  useEffect(() => {
    if (timer.playing) {
      var c = setInterval(() => {
        percentage = ((timer.minutes * 60 + timer.seconds) * 100) / (25 * 60);
        setTimer((pS) => handlePomodoroStage(pS));
      }, 200);
    }
    return () => {
      clearInterval(c);
    };
  }, [timer.playing]);

  const handleClick = (e) => {
    setTimer({ ...timer, playing: !timer.playing });
  };

  return (
    <PomodoroWrapper>
      <PomodoroHeader>
        <Menu click={options}>
          {options ? (
            <RiCloseFill onClick={() => setOptions(!options)} />
          ) : (
            <HiMenuAlt4 onClick={() => setOptions(!options)} />
          )}
          <div className="hiddenMenu">
            <TimeSettings
              title="timer"
              defaultTime={`${timer.minutes}:${
                timer.seconds < 9 ? `${timer.seconds}0` : timer.seconds
              }`}
            />
            <TimeSettings
              title="Descanso corto"
              defaultTime={`${timer.minutes}:${
                timer.seconds < 9 ? `${timer.seconds}0` : timer.seconds
              }`}
            />
            <TimeSettings
              title="Descanso largo"
              defaultTime={`${timer.minutes}:${
                timer.seconds < 9 ? `${timer.seconds}0` : timer.seconds
              }`}
            />
            <TimeSettings title="Rondas" defaultTime="0" />
            <MoreSettings />
          </div>
        </Menu>
        <h2>Pomotroid</h2>
        <HiOutlineInformationCircle />
      </PomodoroHeader>
      <Clock valor={`${100 - percentage}%`}>
        <div className="elements-wrapper">
          <CountDown>
            {timer.minutes}:
            {timer.seconds < 10 ? "0" + timer.seconds : timer.seconds}
          </CountDown>
          <p>FOCUS</p>
        </div>
      </Clock>
      <Control onClick={handleClick}>
        {timer.playing ? <FaPause /> : <FaPlay />}
      </Control>
      <PomodoroFooter>
        <div className="lap">
          <p>{timer.phase}/4</p>
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
