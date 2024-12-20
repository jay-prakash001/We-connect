/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  lightbluegreen:'80C5DE',
  blue:'#289DD2',
  solid:'#41C1BA',
  dimgray:'#696969',
  orange:'#ffa500',
  gainsboro:'#dcdcdc',
  WHITE:'#fff',
  GRAY:'#7d7d7d',
  PRIMARY:'#000',
  AQUA:'#00ffff',
  cyan :'#00ffff',
  turquoise:'#40e0d0',

  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const generateRandomLightColor =()=> {
  const r = Math.floor(200 + Math.random() * 56); // Red value between 200-255
  const g = Math.floor(200 + Math.random() * 56); // Green value between 200-255
  const b = Math.floor(200 + Math.random() * 56); // Blue value between 200-255
  return `rgb(${r}, ${g}, ${b})`;
}

