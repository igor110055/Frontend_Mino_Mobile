import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, RefreshControl, View, Dimensions } from 'react-native';

//Components
import { SectionTitle } from '../shared/components/common/SectionTitle';
import BalanceCard from '../shared/components/home/BalanceCard';
import { WalletCardsLists } from '../shared/components/home/WalletCardsLists';

// Styles

// Funtions
import { getSelectedBadges, getLinkedAccounts } from '../functions/HomeFunctions';

export default function Home() {
    const [selectedBadges, setSelectedBadges] = useState(getSelectedBadges());

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, [refreshing]);

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.mainScroller}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            onRefresh();
                        }}
                    />
                }
            >
                <View style={styles.balanceCardsList}>
                    {selectedBadges &&
                        selectedBadges.map((badge) => (
                            <BalanceCard
                                key={badge.id}
                                badgeId={badge.id}
                                value={badge.value}
                            />
                        ))}
                </View>
                <SectionTitle title="Mis billeteras" />
                <WalletCardsLists />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '50%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        paddingBottom: 95,
    },
    mainScroller: {
        position: 'relative',
        zIndex: 1,
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        paddingRight: 16,
        paddingLeft: 16,
    },
    commonScroller: {
        position: 'relative',
        zIndex: 1,
        flex: 1,
        width: '100%',
        height: 900,
    },
    balanceCardsList: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        width: '97%',
        height: 'auto',
        marginTop: 20,
    },
    walletsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        width: '97%',
        height: 'auto',
        borderRadius: 12,
        marginTop: -20,
    },
});
