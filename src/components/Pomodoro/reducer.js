let defaultSettings = {
  timer: 25,
  short_break: 5,
  long_break: 15,
  rounds: 4,
};

let actualRound = 1;

const getActualPhase = (defaults, actual) => {
  if (actual % defaults.rounds == 0) {
    return ["long break", defaults.long_break];
  } else if (actual % 2 == 0) {
    return ["short break", defaults.short_break];
  } else {
    return ["timer", defaults.timer];
  }
};

const actualTimer = (dS, aR, autoPlay = false) => {
  //dS es el defaultSettings (la lista de configuraciones del los sliders)
  //aR es actualRound (la ronda en la que se encuentra actualmente el pomodoro)
  let [title, minutes] = getActualPhase(dS, aR);
  return { title: title, minutes: minutes, seconds: 0, playing: autoPlay };
};

export const allPomodoroStates = {
  defaultSettings,
  actualTimer: actualTimer(defaultSettings, actualRound),
  actualRound,
};

export const types = {
  UPDATE_SETTINGS: "UPDATE_SETTINGS",
  CHANGE_PHASE: "CHANGE_PHASE",
  PLAY_PAUSE: "PLAY_PAUSE",
  UPDATING_CURRENT_PHASE: "UPDATING_CURRENT_PHASE",
  RESET_DEFAULT_SETTINGS: "RESET_DEFAULT_SETTINGS",
  TIMER: "TIMER",
  SHORT_BREAK: "SHORT_BREAK",
  LONG_BREAK: "LONG_BREAK",
  ROUND: "ROUND",
  RESET: "RESET",
};

export const pomodoroReducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE_SETTINGS: //los slider cambian los defaults cuando tienen nuevos values
      //action.payload regresa un objeto con los nuevos each.timers.value, short, long, phase values
      let [name, value] = action.payload;
      let current;
      switch (name) {
        case types.TIMER:
          current = { ...state.defaultSettings, timer: value };
          break;
        case types.SHORT_BREAK:
          current = { ...state.defaultSettings, short_break: value };
          break;
        case types.LONG_BREAK:
          current = { ...state.defaultSettings, long_break: value };
          break;
        case types.ROUND:
          current = { ...state.defaultSettings, rounds: value };
          break;
        default:
          current = state.defaultSettings;
          break;
      }
      return {
        ...state,
        defaultSettings: current,
        actualTimer: actualTimer(current, state.actualRound),
      };
    case types.CHANGE_PHASE: //cuando el contador llega a cero cambia al siguiente segmento
      if (action.payload) {
        //si se activa auto-start-next-phase
        return {
          ...state,
          actualTimer: actualTimer(
            state.defaultSettings,
            state.actualRound + 1,
            true
          ),
          actualRound: state.actualRound + 1,
        };
      } else {
        return {
          ...state,
          actualTimer: actualTimer(
            state.defaultSettings,
            state.actualRound + 1
          ),
          actualRound: state.actualRound + 1,
        };
      }
    case types.PLAY_PAUSE: //pausa o continua el conteo
      var temporalActualTimer = state.actualTimer;
      return {
        ...state,
        actualTimer: {
          ...temporalActualTimer,
          playing: !temporalActualTimer.playing,
        },
      };
    case types.UPDATING_CURRENT_PHASE: //es el timer, se activa cuando playing: true
      return { ...state, actualTimer: action.payload };
    case types.RESET_DEFAULT_SETTINGS: //el contador se reinicia con la configuracion predeterminada, la fase se mantiene
      return {
        ...state,
        defaultSettings: allPomodoroStates.defaultSettings,
        actualTimer: actualTimer(
          allPomodoroStates.defaultSettings,
          state.actualRound
        ),
      };
    default:
      console.log("reducer en default, retornando state");
      return state;
  }
};
