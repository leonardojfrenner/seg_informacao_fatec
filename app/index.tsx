import {View, Text, StatusBar, Button,Image} from 'react-native';
import React from 'react';
import {styles} from '../styles/styles';
import { useRouter } from 'expo-router';
import Botao from '../comp/botao';


export default function App() {
    const router = useRouter();
    return (
        <View style={styles.container}>
           <Image source={require('../assets/expo.png')} style={styles.image} />
           <Botao texto="Iniciar" onPress={() => router.push('./(tabs)')}/>
        </View>
    );
}