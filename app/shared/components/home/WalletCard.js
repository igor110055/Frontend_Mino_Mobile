import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import { badgeDictionary } from '../../../functions/GlobalFunctions'

import { useNavigation } from '@react-navigation/native'

export const WalletCard = ({ account }) => {
    const navigate = useNavigation()
    const { name, balance, currency, color, performanceStatus, performance } = account
    const getBadge = () => {
        const badge = badgeDictionary().find((badge) => {
            return badge.id === currency;
        });
        return badge.badge;
    }
    const [newCurrency, setNewCurrency] = useState(getBadge())

    let performanceSign;
    let performanceColor;
    switch (performanceStatus) {
        case "up":
            performanceSign = "+"
            performanceColor = "#00C853"
            break;
        case "down":
            performanceSign = "-"
            performanceColor = "#D50000"
            break;
        default:
            performanceSign = null
            performanceColor = "#323232"
            break;
    }

    return (
        <TouchableOpacity
            style={[styles.walletContainer, { backgroundColor: color }]}
            activeOpacity={.9}
            onPress={() => {
                navigate.navigate('WalletDetails', { account: account })
            }}
        >
            <View style={styles.walletInfo}>
                <Text style={styles.walletName}>{name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.walletCurrency}>{newCurrency}</Text>
                    <Text style={styles.walletBalance}>{balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </View>
            </View>
            <View style={styles.walletPerformance}>
                <Text style={[styles.walletPerformanceStatus, { color: performanceColor }]}>{performanceSign}</Text>
                <Text style={[styles.walletPerformanceText, { color: performanceColor }]}>{performance}</Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    walletContainer: {
        position: 'relative',
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#bfbfbf',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    walletInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    walletName: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: '#fff',
    },
    walletCurrency: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        color: '#fff',
        marginRight: 5,
    },
    walletBalance: {
        fontFamily: 'Nunito-Bold',
        fontSize: 15,
        color: '#fff',
    },
    walletPerformance: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 2,
        width: 95,
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 6,
    },
    walletPerformanceStatus: {
        fontFamily: 'Nunito-Bold',
        fontSize: 15,
        color: '#fff',
        marginTop: 3,
        marginRight: 5,
        height: 20,
    },
    walletPerformanceText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 15,
        color: '#fff',
        marginTop: 4,
        height: 20,
    },
})
