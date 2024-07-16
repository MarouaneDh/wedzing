import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'

import { deleteList, getAllLists } from '../redux/slices/list/listAsyncThunk'
import { useNavigation } from '@react-navigation/native'
import { resetOneDeleteListData } from '../redux/slices/list/listSlice'

const DeleteListModal = ({ setDeleteModalVisible, listId }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const { list } = useSelector((state) => state.lists.oneList)
    const { deleteOneList } = useSelector((state) => state.lists)

    const deleteListHandler = () => {
        dispatch(deleteList(listId))
    }

    useEffect(() => {
        if (deleteOneList.status === 'fulfilled') {
            navigation.navigate('Dashboard')
        }
    }, [deleteOneList.status])

    useEffect(() => () => {
        dispatch(resetOneDeleteListData());
        dispatch(getAllLists())
    }, []);

    return (
        <View style={styles.deleteModal}>
            <Text style={styles.deleteModalmessage}>Do you really want to delete your {list.listName} list?</Text>
            <View style={styles.deleteModalButtonsContainer}>
                <Pressable style={styles.deleteModalButtons} onPress={() => deleteListHandler()}>
                    {deleteOneList?.isLoading && <ActivityIndicator color="#fff" />}
                    <Text style={styles.yesText}>Yes</Text>
                </Pressable>
                <Pressable onPress={() => setDeleteModalVisible(false)}>
                    <Text style={styles.deleteModalButtons}>No</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default DeleteListModal

const styles = StyleSheet.create({
    deleteModal: {
        alignItems: 'center',
        marginTop: 300,
        backgroundColor: '#e4e4e4',
        justifyContent: 'center',
        height: 200,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#8b8b8b',
        padding: 15
    },
    deleteModalmessage: {
        textAlign: 'center',
        lineHeight: 25,
        fontSize: 22
    },
    deleteModalButtonsContainer: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 15,
    },
    deleteModalButtons: {
        fontSize: 20,
        padding: 15,
        color: 'white',
        backgroundColor: 'black',
        borderRadius: 15,
        flexDirection: 'row',
        gap: 10
    },
    yesText: {
        fontSize: 20,
        color: 'white',
    },
})