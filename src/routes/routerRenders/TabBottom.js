import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Text } from 'react-native';
import tw from 'twrnc'
import TabBottomRouters from '../routerConfigs/TabBottom.config';
import { PRIMARY_COLOR } from '../../styles/color.global';

const Tab = createBottomTabNavigator()

const TabBottom = () => {

    return (
        <Tab.Navigator
            initialRouterName="info"
            screenOptions={{ headerShown: false }}
        >
            {
                TabBottomRouters.map((tab, index) => {
                    const {
                        screen,
                        label,
                        tabIconLabel,
                        iconName
                    } = { ...tab }

                    return (
                        <Tab.Screen
                            key={index}
                            name={label}
                            component={screen}
                            options={{
                                navigationOptions: {
                                    headerShown: false,
                                },
                                tabBarLabelStyle: {
                                    fontSize: 13,
                                    fontWeight: 'bold'
                                },
                                tabBarStyle: {
                                    height: 54,
                                    paddingBottom: 5
                                },

                                tabBarIcon: ({ focused, color, size }) => {
                                    return (
                                        <IconFontAwesome
                                            name={iconName}
                                            size={16}
                                            color={
                                                focused ? `${PRIMARY_COLOR}` : '#666'
                                            }
                                            solid
                                        />
                                    )
                                },
                                tabBarLabel: ({ focused }) => {
                                    return (
                                        <Text style={tw`${focused ? 'text-[#C92127]' : 'text-[#666]'}`}>
                                            {label}
                                        </Text>
                                    )
                                }
                            }}

                        />
                    )
                })
            }
        </Tab.Navigator>
    )
}

export default TabBottom