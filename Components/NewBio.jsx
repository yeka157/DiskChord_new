import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, useDisclosure, ModalFooter, Button, useToast } from '@chakra-ui/react';
import { XIcon } from '@heroicons/react/outline';
import Axios from 'axios';

export default function NewBio(props) {
    const [images, setImages] = React.useState("");
    const [bio, setBio] = React.useState(props.user.user_bio);
    const [fullName, setFullName] = React.useState("");
    const [selectedImg, setSelectedImg] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [usernameUsed, setUsernameUsed] = React.useState(false);
    const [usernameMsg, setUsernameMsg] = React.useState('');
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const filePickerRef = React.useRef(null);

    const btnSave = async() => {
        try {
            if (usernameUsed === false) {
                if (images) {
                let formData = new FormData();
                formData.append(
                    "data",
                    JSON.stringify({
                        username,
                        name : fullName,
                        user_bio : bio
                    })
                );
                images && formData.append('images', images);
                    let res = await Axios.patch(`http://localhost:3105/auth/update/${props.user.idusers}`, formData);
                    if (res.data.success) {
                        props.function();
                        toast({
                            title:'Profile Updated',
                            status : 'success',
                            duration : 2000,
                            isClosable : true
                        })
                        onClose();
                        setUsername("");
                        setFullName("");
                        setBio("");
                    }
                } else if (!images) {
                    let res = await Axios.patch(`http://localhost:3105/auth/edit/${props.user.idusers}`, {
                        username,
                        name : fullName,
                        user_bio : bio
                    });
                    if (res.data.success) {
                        props.function()
                        toast({
                            title:'Profile Updated',
                            status : 'success',
                            duration : 2000,
                            isClosable : true
                        })
                        onClose();
                        setUsername("");
                        setFullName("");
                        setBio("");
                    }
                }
            } else if (usernameUsed === true) {
                toast({
                    title : 'Username used',
                    status : 'error',
                    duration : 2000,
                    isClosable : true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addImage = (e) => {
        console.log(e.target.files);
        setImages(e.target.files[0]);
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        };
        reader.onload = (readerEvent) => {
            setSelectedImg(readerEvent.target.result);
        };
    }

    React.useEffect(() => {
        if (username) {
            if (username === props.user.username) {
                setUsernameUsed(false);
            } else {
                Axios.post('http://localhost:3105' + '/auth/username', {
                    username
                }).then((res) => {
                    if (res.data.length > 0) {
                        let check = [];
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].username.toLowerCase() === username.toLowerCase()) {
                                check.push(true);
                            }
                        }
                        if (check.length > 0) {
                            setUsernameUsed(true);
                        } else {
                            setUsernameUsed(false);
                        }
                    } else {
                        setUsernameUsed(false);
                    }
                })
            }
        }
    }, [username]);

    const btnVerify = async() => {
        try {
            if (props.user.status === "Unverified") {
                let res = await Axios.post('http://localhost:3105/auth/send', {
                    email : props.user.email
                });
                if (res.data.success) {
                    localStorage.setItem('verification', res.data.token);
                    toast({
                        title : 'Verification email sent',
                        description : 'Please check your email',
                        status : 'success',
                        duration : 3000,
                        isClosable : true
                    })
                    props.function();
                }
            } else {
                toast({
                    title : 'Account verified',
                    description : 'Account already verified',
                    status : 'success',
                    duration : 3000,
                    isClosable : true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='pt-7 px-3 border-b border-secondaryHover pb-3'>
        <div className='flex space-x-3 justify-between items-center'>
            <div className='flex items-center space-x-3'>
            <img 
                src={props.user.user_profilepicture ? `http://localhost:3105/${props.user.user_profilepicture}` : '/default.jpg'} 
                alt="profile-img" 
                className='p-1 w-32 h-32 cursor-pointer hover:brightness-90 rounded-full'
                style={{border:'2px solid black'}}
            />
            <h1 className='text-2xl font-bold'>
                @{props.user.username}
            </h1>
            </div>
            <div className=''>
                {props.user.status === "Unverified" ? 
                <button className='my-2.5 mx-1.5 w-25 h-9 rounded-full bg-secondaryHover text-secondary px-4 py-1.5 font-semibold hover:brightness-90 shadow-md' onClick={btnVerify}>Verify Account</button>
                : <></>
                }
                <button className='my-2.5 mx-1.5 w-25 h-9 rounded-full bg-secondaryHover text-secondary px-4 py-1.5 font-semibold hover:brightness-90 shadow-md' onClick={onOpen}>Edit Profile</button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Full Name</FormLabel>
                            <Input defaultValue={props.user.name} type='text' onChange={(e) => setFullName(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Bio</FormLabel>
                            <Input defaultValue={props.user.user_bio} type='text' onChange={(e) => setBio(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input 
                                defaultValue={props.user.username} 
                                type='text'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {username ? (
                                usernameUsed ? (
                                    <small className='h-4 text-left w-full md:w-[50%] px-4 text-red-500 font-bold'>Username already used, try another username</small>
                                ) : (
                                    <small className='h-4 text-left w-full md:w-[50%] px-4 text-green-400 font-bold'>Username available</small>
                                )
                            ) : (
                                <small className='h-4 text-left w-full md:w-[50%] px-4 text-green-400 font-bold'>{usernameMsg}</small>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Profile Picture</FormLabel>
                            <div className='border p-2'>
                                <Input type='file' hidden ref={filePickerRef} onChange={addImage}/>
                                <Button onClick={() => filePickerRef.current.click()}>Browse</Button>
                                {selectedImg && (
                                    <div className='relative'>
                                        <XIcon 
                                            className='h-7 border m-1 border-white text-black absolute cursor-pointer font-bold rounded-full'
                                            onClick={() => {setSelectedImg(null); setImages('');}}
                                        />
                                        <img 
                                            src={selectedImg} 
                                            alt="profile-img"
                                            className='mt-2'
                                        />
                                    </div>
                                )}
                            </div>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={btnSave}>Save</Button>
                        <Button onClick={onClose} variant='outline'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
        <div className='space-y-3 mt-2.5'>
            <h1 className='font-bold text-md sm:text-lg'>@{props.user.username}</h1>
            <p className='font-light text-md sm:text-md'>{props.user.name}</p>
            <h6 className='font-light text-md sm:text-md'>{props.user.user_bio}</h6>
            <p className='font-light text-md sm:text-md flex items-center'><span className='mr-1.5'><HiOutlineMail/></span> Email : {props.user.email}</p>
        </div>
    </div>
  )
}

// http://localhost:3105/imgProfile/IMGPRFL1660567449389.png
// http://localhost:3105/imgProfile/IMGPRFL1660567449389.png
