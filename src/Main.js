import React from 'react';
import Introduction from './components/loaders/Introduction';
import TabAllStack from './routes/routerRenders/TabAllStack';
import {StatusBar} from 'react-native';
import {PRIMARY_COLOR} from './styles/color.global';

const Main = () => {
  const [isIntro, setIsIntro] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsIntro(false);
    }, 5000);

    return () => clearTimeout();
  }, []);

  return (
    <>
      {isIntro ? (
        <Introduction />
      ) : (
        <>
          <TabAllStack />
          <StatusBar translucent backgroundColor={PRIMARY_COLOR} />
        </>
      )}
    </>
  );
};

export default Main;
