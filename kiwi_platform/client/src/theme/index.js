/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import { colors, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import typography from './typography';
import { softShadows, strongShadows } from './shadows';
import { THEMES } from '../constants';

const baseConfig = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    }
  }
};

const themeConfigs = [
  {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600]
          }
        }
      }
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600]
      },
      background: {
        default: '#f3f9ff',
        dark: '#e9eff5',
        paper: '#f3f9ff'
      },
      primary: {
        main: '#0082FD'
      },
      secondary: {
        main: '#0082FD'
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600]
      }
    },
    shadows: softShadows
  },
  {
    name: THEMES.CORAL,
    overrides: {
      MuiInputBase: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: colors.blueGrey[600]
          }
        }
      }
    },
    palette: {
      type: 'light',
      action: {
        active: colors.blueGrey[600]
      },
      background: {
        default: '#fff3f3',
        dark: '#f5e9e9',
        paper: '#fff3f3'
      },
      primary: {
        main: '#FF6F73'
      },
      secondary: {
        main: '#FF6F73'
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600]
      }
    },
    shadows: softShadows
  },
  // {
  //   name: THEMES.DARK,
  //   palette: {
  //     type: 'dark',
  //     action: {
  //       active: 'rgba(255, 255, 255, 0.54)',
  //       hover: 'rgba(255, 255, 255, 0.04)',
  //       selected: 'rgba(255, 255, 255, 0.08)',
  //       disabled: 'rgba(255, 255, 255, 0.26)',
  //       disabledBackground: 'rgba(255, 255, 255, 0.12)',
  //       focus: 'rgba(255, 255, 255, 0.12)'
  //     },
  //     background: {
  //       default: '#282C34',
  //       dark: '#1c2025',
  //       paper: '#282C34'
  //     },
  //     primary: {
  //       main: '#3EE1D8'
  //     },
  //     secondary: {
  //       main: '#3EE1D8'
  //     },
  //     text: {
  //       primary: '#e6e5e8',
  //       secondary: '#adb0bb'
  //     }
  //   },
  //   shadows: strongShadows
  // },
  {
    name: THEMES.DARK,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#171d1d',
        dark: '#111717',
        paper: '#171d1d'
      },
      primary: {
        main: '#3EE1D8'
      },
      secondary: {
        main: '#3EE1D8'
      },
      text: {
        primary: '#e6e9e9',
        secondary: '#e5fefe'
      }
    },
    shadows: strongShadows
  },
  {
    name: THEMES.KIWI,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#252530',
        dark: '#1c1c25',
        paper: '#252530'
      },
      primary: {
        main: '#5F5CFE'
      },
      secondary: {
        main: '#5F5CFE'
      },
      text: {
        primary: '#d5d5ff',
        // primary: '#d5d4ff',
        secondary: '#cacaff'
        // secondary: '#e2e1ff'
      }
    },
    shadows: strongShadows
  },
  {
    name: THEMES.MIDNIGHT_BLUE,
    palette: {
      type: 'dark',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        selected: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)'
      },
      background: {
        default: '#01001b',
        dark: '#03003d',
        paper: '#01001b'
      },
      primary: {
        main: '#100782'
      },
      secondary: {
        main: '#100782'
      },
      text: {
        primary: '#E6E6FA',
        secondary: '#dedefa'
      }
    },
    shadows: strongShadows
  }
];

export function createTheme(settings = {}) {
  let themeConfig = themeConfigs.find((theme) => theme.name === settings.theme);

  if (!themeConfig) {
    console.warn(new Error(`The theme ${settings.theme} is not valid`));
    [themeConfig] = themeConfigs;
  }

  let theme = createMuiTheme(
    _.merge(
      {},
      baseConfig,
      themeConfig,
      { direction: settings.direction }
    )
  );

  if (settings.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
}

export default createTheme;