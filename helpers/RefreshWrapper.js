import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

const RefreshWrapper = ({ children, onRefresh }) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        onRefresh().finally(() => {
            setRefreshing(false);
        });
    }, [onRefresh]);

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >
            {children}
        </ScrollView>
    );
};

export default RefreshWrapper;
