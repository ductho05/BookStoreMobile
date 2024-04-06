import React from 'react';
import Introduction from './components/loaders/Introduction';
import TabAllStack from './routes/routerRenders/TabAllStack';
import { StatusBar, View } from 'react-native';
import { PRIMARY_COLOR } from './styles/color.global';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './stores/asyncActions';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { getData, plusNumNotice, setData } from './utils/storage';
import { updateNumnotice } from './stores/userSlice';
import tw from 'twrnc'
import notifee from '@notifee/react-native';

const getToken = () => {
    messaging().getToken().then((deviceToken) => {
        if (!getData("deviceToken") && deviceToken) {

            setData("deviceToken", deviceToken)
        }
    })
}

const permission = () => {
    messaging().requestPermission().then((permission) => {
        if (permission) {
            console.log('Permission granted');
        } else {
            console.log('Permission denied');
        }
    });
}

const Main = () => {
    const [isIntro, setIsIntro] = React.useState(true);
    const { token } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const displayNotification = () => {

        messaging().onMessage(async (remoteMessage) => {

            Alert.alert('new notification')
        });

        messaging().onNotificationOpenedApp(async (remoteMessage) => {

            plusNumNotice()
        });

        // messaging().getInitialNotification().then(async (remoteMessage) => {

        //   dispatch(updateNumnotice(1))
        // });

        messaging().setBackgroundMessageHandler(async remoteMessage => {

        });
    }

    React.useEffect(() => {

        permission()
        getToken()
        displayNotification()

        setTimeout(() => {
            setIsIntro(false);
        }, 5000);

        return () => clearTimeout();
    }, []);

    React.useEffect(() => {
        dispatch(checkUser(token))
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
