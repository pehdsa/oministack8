import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import Like from '../assets/like.png';
import Dislike from '../assets/dislike.png';
import itsAMatch from '../assets/itsamatch.png';

export default function Main({ navigation }) {

    const userId = navigation.getParam('user');
    const [ users, setUsers ] = useState([]);   
    const [ matchDev, setMatchDev ] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs',{
                headers: {
                    user: userId
                }
            });
            setUsers(response.data);
        }
        loadUsers(); 
    }, [userId]);

    useEffect(() => {
        const socket = io('http://10.0.3.2:3333', {
            query: { user: userId }
        });
        socket.on('match', dev => {
            setMatchDev(dev);
        });
    }, [userId]);
    
    async function pushLike() {
        const [ user, ...rest ] = users;
        const response = await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: userId }
        });
        if (response.data.likes.includes(userId)) {
            console.log('DEU MATCH');
        }        
        setUsers(rest);        
    }    
    async function pushDislike() {        
        const [ user, ...rest ] = users;
        await api.post(`/devs/${user._id}/dislikes`, null ,{
            headers: { user: userId }
        });
        setUsers(rest);        
    }

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            
            <View style={styles.cardsContainer}>
                
                { users.length === 0 ? <Text style={styles.empty}>Acabou =(</Text> : (
                    users.map((user, index) => (

                        <View key={user._id} style={[styles.card, {zIndex: users.length - index}]}>
                            <Image style={styles.avatar} source={{ uri: user.avatar }} />
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                            </View>
                        </View> 
    
                    ))
                ) }                                              

            </View>


            { users.length > 0 && (
                <View style={[styles.buttonsContainer, {zIndex: 5}]}>
                    <TouchableOpacity onPress={pushDislike} style={styles.button}>
                        <Image source={Dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pushLike} style={styles.button}>
                        <Image source={Like} />
                    </TouchableOpacity>
                </View>
            ) } 

            { matchDev && (
                <View style={[styles.matchContainer, {zIndex: 10}]}>
                    <Image style={styles.matchImage} source={itsAMatch} />
                    <Image style={styles.matchContainerAvatar} source={{ uri: matchDev.avatar }} />
                    <Text style={styles.matchContainerName}>{matchDev.name}</Text>
                    <Text style={styles.matchContainerBio}>{matchDev.bio}</Text>
                    <TouchableOpacity onPress={() => setMatchDev(null)} >
                        <Text style={styles.matchContainerButton}>FECHAR</Text>
                    </TouchableOpacity>
                </View>
            ) }
            

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',        
    },    
    logo: {
        marginTop: 30, 
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,        
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    avatar: {
        flex: 1,
        height: 300
    },
    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    
    matchContainer: {
        ...StyleSheet.absoluteFillObject,        
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    matchImage: {
        resizeMode: 'contain',
        height: 60
    },
    matchContainerAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
        marginVertical: 30
    },
    matchContainerName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF'
    },
    matchContainerBio: {
       marginTop: 10,
       fontSize: 16,
       color: 'rgba(255,255,255,0.8)',
       lineHeight: 24,
       textAlign: 'center',
       paddingHorizontal: 30 
    },
    matchContainerButton: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold'
    }

})