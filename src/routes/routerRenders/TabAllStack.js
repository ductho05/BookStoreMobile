import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabAllRoutes from '../routerConfigs/TabAll.config';
import { useDispatch } from 'react-redux';
import React from 'react';
import { fetchInitialData } from '../../stores/asyncActions';

const Stack = createNativeStackNavigator()

const TabAllStack = () => {

    const dispatch = useDispatch()

    React.useEffect(() => {

        dispatch(fetchInitialData())
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"TabBottom"}
                screenOptions={{
                    headerShown: false
                }}
            >
                {
                    TabAllRoutes.map(screen => (

                        <Stack.Screen
                            key={screen.name}
                            name={screen.name}
                            component={screen.component}
                        />
                    ))
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default TabAllStack