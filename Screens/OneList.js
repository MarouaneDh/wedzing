import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Text, StyleSheet, SafeAreaView, Image, Pressable, Modal, View, TextInput, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import OneListItem from '../components/OneListItem';

import { editList, getAllLists, getOneList } from '../redux/slices/list/listAsyncThunk';
import { resetOneListData } from '../redux/slices/list/listSlice';
import globalStyle from '../styles/styles';
import RefreshWrapper from '../helpers/RefreshWrapper';
import AddListItem from './AddListItem';
import DeleteListModal from '../components/DeleteListModal';

const OneList = ({ route }) => {
    const dispatch = useDispatch()

    const { list } = useSelector((state) => state.lists.oneList)
    const editOneList = useSelector((state) => state.lists.editOneList)

    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editingListName, setEditingListName] = useState(false)
    const [newListName, setNewListName] = useState('')

    const listId = route.params.listId

    const toggleListNameChangeHandler = () => {
        setEditingListName(true)
    }

    const editListNameHandler = () => {
        dispatch(editList({ id: listId, listName: newListName }))
    }

    useEffect(() => {
        if (listId) {
            dispatch(getOneList(listId))
        }
    }, [listId, dispatch])

    useEffect(() => {
        if (list) {
            setNewListName(list?.listName)
        }
    }, [list])

    useEffect(() => {
        if (editOneList?.status === "fulfilled") {
            setEditingListName(false)
            dispatch(getOneList(listId))
        }
    }, [editOneList])

    useEffect(() => () => {
        dispatch(resetOneListData())
        dispatch(getAllLists())
    }, []);

    return (
        <RefreshWrapper onRefresh={() => dispatch(getOneList(listId))}>
            {list?.list && <SafeAreaView style={globalStyle.container}>
                <View style={styles.listHeader}>
                    {
                        !editingListName && <Pressable onPress={toggleListNameChangeHandler}>
                            <Image style={styles.stretch} source={require('../assets/edit.png')} />
                        </Pressable>
                    }
                    {
                        editingListName ?
                            <View style={styles.listNameInputContainer}>
                                <TextInput textAlign='center' value={newListName} cursorColor={"#fff"} style={styles.listNameInput} onChangeText={(e) => setNewListName(e)} />
                                <Pressable onPress={editListNameHandler}>
                                    {
                                        editOneList?.isLoading ?
                                            <ActivityIndicator style={styles.editListNameActivityIndicator} color="white" /> :
                                            <Image style={styles.stretch} source={require('../assets/confirm.png')} />
                                    }
                                </Pressable>
                            </View> :
                            <Text style={styles.title}>{list?.listName} ({list?.stat}%)</Text>
                    }
                </View>
                <View style={styles.editDeleteContainer}>
                    <Pressable style={styles.editDeleteElement} onPress={() => setModalVisible(true)}>
                        <Image style={styles.stretch} source={require('../assets/edit.png')} />
                        <Text>Edit list items</Text>
                    </Pressable>
                    <Pressable style={styles.editDeleteElement} onPress={() => setDeleteModalVisible(true)}>
                        <Image style={styles.stretch} source={require('../assets/delete.png')} />
                        <Text>Delete list</Text>
                    </Pressable>
                </View>
                <ScrollView style={styles.list}>
                    {
                        list?.list?.map((item) => {
                            return (
                                <OneListItem listItem={item} key={item._id} />
                            )
                        })
                    }
                </ScrollView>
                <Modal
                    animationType="slide"
                    visible={modalVisible}>
                    <AddListItem list={list} setModalVisible={setModalVisible} />
                </Modal>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={deleteModalVisible}>
                    <DeleteListModal setDeleteModalVisible={setDeleteModalVisible} listId={listId} />
                </Modal>
            </SafeAreaView>}
        </RefreshWrapper>
    );
};

const styles = StyleSheet.create({
    title: {
        color: 'white',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 20,
        fontSize: 25,
        fontWeight: '700'
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listNameInput: {
        backgroundColor: 'gray',
        width: 200,
        fontSize: 22,
        color: 'white',
        borderRadius: 50,
        marginRight: 15,
    },
    listNameInputContainer: {
        marginTop: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 60,
        marginBottom: 10
    },
    editListNameActivityIndicator: {
        width: 25,
        height: 25,
        backgroundColor: '#66BB6A',
        borderRadius: 50,
        marginRight: 20
    },
    list: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 10,
    },
    editDeleteContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10
    },
    editDeleteElement: {
        backgroundColor: '#ebebeb',
        marginVertical: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 25,
        width: 170,
        padding: 10
    },
    item: {
        backgroundColor: '#ebebeb',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderRadius: 25
    },
    stretch: {
        height: 25,
        width: 25,
        marginRight: 20,
    },
})

export default OneList