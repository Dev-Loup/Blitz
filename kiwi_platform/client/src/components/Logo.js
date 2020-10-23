import React, {useState} from 'react';
import { THEMES } from 'src/constants';
import useSettings from 'src/hooks/useSettings';


function Logo(props) {
  const {settings} = useSettings();
  const [values] = useState({
    theme: settings.theme
  });
  let routeImg = '';
  let altImg = '';
  if (values.theme === THEMES.LIGHT) {
    routeImg = '/static/logo_Dark.svg'
    altImg = 'Logo_Dark'
  }
  else if (values.theme === THEMES.CORAL) {
    routeImg = '/static/logo_Dark.svg'
    altImg = 'Logo_Dark'
  }
  else {
    routeImg = '/static/logo.svg'
    altImg = 'Logo'
  }
  // const handleChange = () => {
  //   setValues(
  //     {
  //       ...values,
  //       route: routeImg,
  //       alt: altImg
  //     }
  //   )
  //   saveSettings(values)
  // };
  return (
    <img
      alt={altImg}
      src={routeImg}
      {...props}
      // onChange={handleChange()}
    />
  );
}

export default Logo;
