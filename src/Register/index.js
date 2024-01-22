import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';


const Register = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleRegister = () => {
        if (email === "" || password === "" || confirmPassword === "") {
            Alert.alert('Vui lòng nhập đầy đủ thông tin !');
        }
        else {
            if (password !== confirmPassword) {
                Alert.alert('Mật khẩu không khớp !');
            }
            else {
                const newAccount = {
                    email: email,
                    password: password,
                };
                addRegister(newAccount);
            }
        }
    }

    const addRegister = async (itemAccount) => {
        try {
            const existingUserItems = await AsyncStorage.getItem('userItems');
            let userItems = [];
            if (existingUserItems) {
                userItems = JSON.parse(existingUserItems);
            }

            // Kiểm tra xem email đã tồn tại trong danh sách đăng ký chưa
            const existingUserIndex = userItems.findIndex(
                (item) => item.email === itemAccount.email
            );

            if (existingUserIndex !== -1) {
                // Alert.alert('Tài khoản đã tồn tại');
                alert('Tài khoản đã tồn tại');
            } else {
                const newAccount = {
                    ...itemAccount
                };
                userItems.push(newAccount);
                await AsyncStorage.setItem('userItems', JSON.stringify(userItems));
                console.log('aaa', userItems);
                alert('Đăng ký tài khoản thành công');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log('Error adding account:', error);
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/bg-login.jpg')}
                style={styles.bg}
            >
                <View style={styles.content}>
                    <Image
                        source={require('../../assets/images/avt1.png')}
                        style={styles.image}
                    />
                    <Text style={{ color: 'white' }}> Welcome !</Text>
                    <Text style={{ color: 'white' }}>Please enter information below</Text>
                    {/* <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        keyboardType="input your email-address"
                    /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="input your email-address"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="confirmPassword"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

// ...styles definition...

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    input: {
        color: 'gray',
        backgroundColor: '#ffff',
        margin: 10,
        borderRadius: 20,
        height: 70,
        width: '70%',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    buttonUserName: {
        justifyContent: 'left',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
        tintColor: 'white'
    },
    text: {
        fontSize: 18,
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop: 30,
        alignItems: 'center',
    },
    buttonSignInGoole: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop: 30,
        alignItems: 'center',
    },
    buttonSignInFaceBook: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#DDDDDD',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#888',
    },
});

export default Register;