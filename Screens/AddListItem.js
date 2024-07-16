import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'

import { useCameraPermission, Camera, useCameraDevice } from 'react-native-vision-camera'
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import OneItemForm from '../components/OneItemForm';
import { uploadOneImage } from '../redux/slices/image/imageAsyncThunk';
import { resetImageData } from '../redux/slices/image/imageSlice';
import { editList, getOneList } from '../redux/slices/list/listAsyncThunk';
import { getAsyncStorageData } from '../helpers/storage';
import { resetEditOneListData } from '../redux/slices/list/listSlice';

const AddListItem = ({ setModalVisible, list }) => {
    const dispatch = useDispatch()
    const image = useSelector((state) => state.images.images)
    const editOneList = useSelector((state) => state.lists.editOneList)

    const { hasPermission, requestPermission } = useCameraPermission()
    const cameraRef = useRef(null)

    const [newList, setNewList] = useState(list?.list)

    const [isCameraActive, setIsCameraActive] = useState(false)
    const [isDeviceFront, setIsDeviceFront] = useState(true)
    const [isFlashOn, setIsFlashOn] = useState(true)
    const [capturedPhotoPath, setCapturedPhotoPath] = useState(null)
    const [capturedPhotoType, setCapturedPhotoType] = useState("")
    const [capturedPhotoName, setCapturedPhotoName] = useState("")
    const [itemIndex, setItemIndex] = useState(0)

    const backDevice = useCameraDevice('back')
    const frontDevice = useCameraDevice('front')

    const isFocused = useIsFocused()
    const isActive = isFocused

    const handleSaveChanges = () => {
        dispatch(editList({ listName: list.listName, listCategory: list.listCategory, list: newList, id: list._id }))
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    const handleAddItem = async () => {
        const userID = await getAsyncStorageData("userID");
        setNewList((prevState) => {
            return (
                [
                    ...prevState,
                    {
                        item: "",
                        isBought: false,
                        numberOfItems: 0,
                        numberOfItemsBought: 0,
                        addedBy: userID,
                        imageURLs: []
                    }
                ]
            )
        })
    }

    const deleteItemHandler = (index) => {
        setNewList((prevState) => {
            return prevState.filter((_, i) => i !== index);
        });
    };

    const takePicture = (index) => {
        if (hasPermission) {
            setIsCameraActive(true)
            setItemIndex(index)
        } else {
            requestPermission()
        }
    }

    const closeCamera = () => {
        setIsCameraActive(false)
        setCapturedPhotoPath(null)
        dispatch(resetImageData())
    }

    const flipCamera = () => {
        setIsDeviceFront(!isDeviceFront)
    }

    const toggleFlash = () => {
        setIsFlashOn(!isFlashOn)
    }

    const capturePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto({
                flash: isFlashOn && !isDeviceFront ? 'on' : 'off',
                qualityPrioritization: 'quality',
            })
            const result = await fetch(`file://${photo.path}`)
            const data = await result.blob();

            setCapturedPhotoType(data.type)
            setCapturedPhotoName(data._data.name)
            setCapturedPhotoPath(photo.path)
        }
    }

    const uploadPhoto = async () => {
        const formData = new FormData();
        formData.append('file', {
            uri: `file://${capturedPhotoPath}`,
            type: capturedPhotoType,
            name: capturedPhotoName,
        });

        try {
            dispatch(uploadOneImage(formData));
        } catch (error) {
            console.error('Failed to upload image:', error);
        }
    };

    useEffect(() => {
        if (image.status === 'fulfilled') {
            closeCamera()
        }
    }, [image.status])

    useEffect(() => {
        if (editOneList.status === 'fulfilled' && editList) {
            setModalVisible(false)
            dispatch(resetEditOneListData())
            dispatch(getOneList(list._id))
        }
    }, [editOneList])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Editing {list.listName} list</Text>
            </View>
            <ScrollView>
                {
                    newList?.map((item, index) => {
                        return (
                            <OneItemForm setNewList={setNewList} takePicture={takePicture} deleteItemHandler={deleteItemHandler} index={index} key={index} itemIndex={itemIndex} item={item} imageURLs={item?.imageURLs} />
                        )
                    })
                }
            </ScrollView>
            <Pressable style={styles.editDeleteElement} onPress={handleAddItem}>
                <Image style={styles.stretch} source={require('../assets/add.png')} />
                <Text style={styles.save}>Add a new Item</Text>
            </Pressable>
            <Pressable style={styles.editDeleteElement} onPress={handleSaveChanges}>
                <Image style={styles.stretch} source={require('../assets/save.png')} />
                <Text style={styles.save}>Save changes</Text>
            </Pressable>
            <Pressable style={styles.editDeleteElement} onPress={handleCancel}>
                <Image style={styles.stretch} source={require('../assets/close.png')} />
                <Text style={styles.save}>Cancel</Text>
            </Pressable>
            {isCameraActive && (frontDevice || backDevice) && hasPermission && (
                <View style={styles.cameraContainer}>
                    <Camera
                        style={[StyleSheet.absoluteFill]}
                        ref={cameraRef}
                        device={isDeviceFront ? frontDevice : backDevice}
                        isActive={isActive}
                        photo={true}
                    />
                    <Pressable style={styles.captureButton} onPress={capturePhoto} />
                    <View style={styles.cameraHeader}>
                        <Pressable onPress={flipCamera}>
                            <Image style={styles.cameraHeaderImages} source={require('../assets/flip.png')} />
                        </Pressable>
                        <Pressable onPress={toggleFlash}>
                            {
                                isFlashOn ?
                                    <Image style={styles.cameraHeaderImages} source={require('../assets/flash-on.png')} /> :
                                    <Image style={styles.cameraHeaderImages} source={require('../assets/flash-off.png')} />
                            }
                        </Pressable>
                        <Pressable onPress={closeCamera}>
                            <Image style={styles.cameraHeaderImages} source={require('../assets/close.png')} />
                        </Pressable>
                    </View>
                    {capturedPhotoPath && (
                        <View style={styles.previewContainer}>
                            <Image style={styles.previewImage} source={{ uri: 'file://' + capturedPhotoPath }} />
                            <Pressable onPress={uploadPhoto} style={styles.confirmPhotoContainer}>
                                <Image style={styles.confirmPhoto} source={require('../assets/confirm.png')} />
                            </Pressable>
                            {image?.isLoading && <ActivityIndicator style={styles.uploadPhotoActivityIndicator} color="white" />}
                        </View>
                    )}
                </View>
            )}
        </View>
    )
}

export default AddListItem

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000',
        marginTop: 15
    },
    editDeleteElement: {
        backgroundColor: '#ebebeb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderTopColor: '#000',
        borderTopWidth: 1,
    },
    save: {
        fontSize: 20,
        textAlign: 'center',
        color: '#000',
    },
    stretch: {
        height: 25,
        width: 25,
        marginRight: 20
    },
    cameraContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    cameraHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 30,
    },
    captureButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        position: 'absolute',
        bottom: 60,
        height: 90,
        width: 90,
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: '#e9e9e9',
    },
    cameraHeaderImages: {
        height: 35,
        width: 35,
    },
    previewContainer: {
        alignItems: 'center',
        marginTop: 20,
        position: 'absolute',
        bottom: 55,
        left: 20,
    },
    previewImage: {
        width: 60,
        height: 100,
        marginTop: 10,
        borderRadius: 6,
    },
    confirmPhotoContainer: {
        position: 'absolute',
        right: -10,
    },
    confirmPhoto: {
        width: 30,
        height: 30,
        backgroundColor: '#66BB6A',
        borderRadius: 50
    },
    uploadPhotoActivityIndicator: {
        position: 'absolute',
        width: 30,
        height: 30,
        right: -10,
        backgroundColor: '#66BB6A',
        borderRadius: 50
    },
})
