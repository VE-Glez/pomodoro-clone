let defaultSettings = {
  timer: 25,
  short_break: 5,
  long_break: 15,
  rounds: 4,
};

let actualRound = 1;
let actualPhase = 1;
let finishedPomodoros = 0;

const getActualPhase = (defaults, ronda, fase) => {
  //ronda es la ronda ronda, 1 ronda equivale a un focus + 1 short break (2 fases)
  //defaults es defaultSettings

  // console.log(
  //   `la ronda ronda es_ ${ronda} y la fase es ${fase} los defaults.rounds: ${defaults.rounds}`
  // );
  if (ronda % defaults.rounds == 0 && fase % 2 == 0) {
    //si la ronda actual divido entre las rondas necesarias para un long break entonces
    return ["LONG BREAK", defaults.long_break];
  } else if (fase % 2 == 0) {
    return ["SHORT BREAK", defaults.short_break];
  } else {
    return ["FOCUS", defaults.timer];
  }
};

const actualTimer = (dS, aR, fase, autoPlay = false) => {
  //dS es el defaultSettings (la lista de configuraciones del los sliders)
  //aR es actualRound (la ronda en la que se encuentra actualmente el pomodoro)
  let [title, minutes] = getActualPhase(dS, aR, fase);
  return { title: title, minutes: minutes, seconds: 0, playing: autoPlay };
};

export const allPomodoroStates = {
  defaultSettings,
  actualTimer: actualTimer(defaultSettings, actualRound, actualPhase),
  actualRound,
  actualPhase,
  finishedPomodoros,
};

export const types = {
  UPDATE_SETTINGS: "UPDATE_SETTINGS",
  PLAY_PAUSE: "PLAY_PAUSE",
  UPDATING_CURRENT_PHASE: "UPDATING_CURRENT_PHASE",
  RESET_DEFAULT_SETTINGS: "RESET_DEFAULT_SETTINGS",
  SKIP_CURRENT_PHASE: "SKIP_CURRENT_PHASE",
  TIMER: "TIMER",
  SHORT_BREAK: "SHORT_BREAK",
  LONG_BREAK: "LONG_BREAK",
  ROUND: "ROUND",
  RESET_CURRENT_PHASE: "RESET_CURRENT_PHASE",
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
        actualTimer: actualTimer(current, state.actualRound, state.actualPhase),
      };
    case types.UPDATING_CURRENT_PHASE: //es el timer, se activa cuando playing: true
      let [actualTime, autoPlay] = action.payload;
      //si el contador llega a cero se inicia la siguiente fase
      if (actualTime.minutes == 0 && actualTime.seconds == 0) {
        let actual_round = Math.ceil((state.actualPhase + 1) / 2);
        if (actual_round > state.defaultSettings.rounds) {
          return {
            ...state,
            actualTimer: actualTimer(state.defaultSettings, 1, 1),
            actualRound: 1,
            actualPhase: 1,
            finishedPomodoros: state.finishedPomodoros + 1,
          };
        }
        if (autoPlay) {
          //si se activa auto-start-next-phase
          return {
            ...state,
            actualTimer: actualTimer(
              state.defaultSettings,
              actual_round,
              state.actualPhase + 1,
              true
            ),
            actualRound: actual_round,
            actualPhase: state.actualPhase + 1,
          };
        } else {
          return {
            ...state,
            actualTimer: actualTimer(
              state.defaultSettings,
              actual_round,
              state.actualPhase + 1
            ),
            actualRound: actual_round,
            actualPhase: state.actualPhase + 1,
          };
        }
      } else {
        return { ...state, actualTimer: actualTime };
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

    case types.RESET_DEFAULT_SETTINGS: //el contador se reinicia con la configuracion predeterminada, la fase se mantiene
      return {
        ...state,
        defaultSettings: allPomodoroStates.defaultSettings,
        actualTimer: actualTimer(
          allPomodoroStates.defaultSettings,
          state.actualRound,
          state.actualPhase
        ),
      };

    case types.RESET_CURRENT_PHASE:
      return {
        ...state,
        actualTimer: actualTimer(
          state.defaultSettings,
          state.actualRound,
          state.actualPhase
        ),
      };
    case types.SKIP_CURRENT_PHASE:
      let actual_round = Math.ceil((state.actualPhase + 1) / 2);
      if (actual_round > state.defaultSettings.rounds) {
        return {
          ...state,
          actualTimer: actualTimer(state.defaultSettings, 1, 1),
          actualRound: 1,
          actualPhase: 1,
          finishedPomodoros: state.finishedPomodoros + 1,
        };
      }
      return {
        ...state,
        actualTimer: actualTimer(
          state.defaultSettings,
          actual_round,
          state.actualPhase + 1,
          action.payload
        ),
        actualRound: actual_round,
        actualPhase: state.actualPhase + 1,
      };
    default:
      console.log("reducer en default, retornando state");
      return state;
  }
};
