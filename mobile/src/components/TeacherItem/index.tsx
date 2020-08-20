import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import  whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles';
import api from '../../services/api';

export interface Teacher{
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp:string;
}
interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> =( {teacher, favorited }) => {
    const [isfavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhats() {
        api.post('connections', {
            user_id: teacher.id,
        })

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handletoggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];
        if(favorites) {
            favoritesArray = JSON.parse(favorites);
        }
        if(isfavorited){
            const favoriteIndex = favoritesArray.findIndex((TeacherItem: Teacher) => {
                return TeacherItem.id === teacher.id;
            });
            
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        }else {
            favoritesArray.push(teacher);

            setIsFavorited(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

    }
    return ( 
    <View  style={styles.container}>
        <View  style={styles.profile}> 
            <Image
            style={styles.avatar}
            source={{ uri: teacher.avatar}}
            />

            <View style={styles.profileInfo} >
                <Text style={styles.name}>{teacher.name}</Text>
                <Text style={styles.subject}>{teacher.subject}</Text>

            </View>

        </View>

        <Text style={styles.bio}>{teacher.bio}</Text>

        <View style={styles.footer} >
            <Text style={styles.price} >
                Hour/ Price {''}
                <Text style={styles.priceValue}> R$ {teacher.cost} </Text>
            </Text>
        </View>

        <View style={styles.buttonsContainer} >
            <RectButton 
            onPress={handletoggleFavorite}
            style={[styles.favoriteButton, 
                    isfavorited ? styles.favorited : {},
             ]} >
                 { isfavorited 
                ? <Image source={unfavoriteIcon} /> 
                : <Image source={heartOutLineIcon} />
                 }
            </RectButton>
        
            <RectButton 
                onPress={handleLinkToWhats}
                style={styles.contactButton} >
                <Image source={whatsappIcon} />
                <Text style={styles.contactButtonText}> Contact </Text>
            </RectButton>
        </View>

    </View>
    )}

export default TeacherItem;