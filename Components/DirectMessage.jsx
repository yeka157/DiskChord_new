import React from 'react'
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure  } from '@chakra-ui/react';
import { ChevronDoubleUpIcon, PlusIcon } from '@heroicons/react/outline';

export default function DirectMessage() {
  const btnRef = React.useRef;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className='fixed bottom-0 right-10 border-x border-t rounded-t-2xl drop-shadow-2xl shadow-2xl border-none hidden md:inline w-[400px] bg-white'>
        <div className='flex justify-between items-center p-3'>
            <h1 className='text-secondary font-semibold text-2xl cursor-default'>Messages</h1>
            <div className='flex justify-between items-center space-x-2'>
                <PlusIcon className='h-10 w-10 cursor-pointer hover:bg-secondaryHover rounded-full p-2'/>
                <ChevronDoubleUpIcon className='h-10 w-10 cursor-pointer hover:bg-secondaryHover rounded-full p-2' type='button'/>
            </div>
        </div>
    </div>
  )
}
