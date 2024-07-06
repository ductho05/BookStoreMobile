import React from 'react';
import Introduction from './components/loaders/Introduction';
import TabAllStack from './routes/routerRenders/TabAllStack';
import { StatusBar } from 'react-native';
import { PRIMARY_COLOR } from './styles/color.global';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './stores/asyncActions';
import messaging from '@react-native-firebase/messaging';
import { getData, setData } from './utils/storage';
import { apiUpdateUser } from './apis/user';
import { update } from './stores/userSlice';
import { useNotification } from './hooks/useNotification';

const getToken = () => {
    messaging().getToken().then(async (deviceToken) => {
        const device_token = await getData("deviceToken")
        if (!device_token && deviceToken) {
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
    const { token, isLoggedIn, user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { displayNotification } = useNotification()

    const handleDisplayNotification = () => {

        messaging().onMessage(async (remoteMessage) => {
            if (remoteMessage) {
                displayNotification({
                    title: remoteMessage.notification.title,
                    description: remoteMessage.notification.body,
                    image: remoteMessage.data.image,
                    largeImage: remoteMessage.data.largeImage,
                    linking: remoteMessage.data.linking
                }, "sound")
            }
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            if (remoteMessage) {
                displayNotification({
                    title: remoteMessage.notification.title,
                    description: remoteMessage.notification.body,
                    image: remoteMessage.data.image,
                    largeImage: remoteMessage.data.largeImage,
                }, "sound")
            }
        });


    }

    const updateDeviceToken = async () => {

        const device_token = await getData('deviceToken')
        if (device_token) {
            if (!user.hasOwnProperty('device_token') || user?.device_token != device_token) {

                const formData = new FormData()
                formData.append("device_token", device_token)

                const response = await apiUpdateUser(formData, user._id, token)
                if (response?.status === 200) {

                    dispatch(update(response.data.data))
                }
            }
        }
    }

    React.useEffect(() => {

        permission()
        getToken()
        handleDisplayNotification()

        setTimeout(() => {
            setIsIntro(false);
        }, 5000);

        return () => clearTimeout();
    }, []);

    React.useEffect(() => {
        dispatch(checkUser(token))
    }, []);

    React.useEffect(() => {

        if (isLoggedIn) {
            updateDeviceToken()
        }
    }, [isLoggedIn])

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
