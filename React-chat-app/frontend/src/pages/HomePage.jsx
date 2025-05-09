import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import NoChatcontainer from '../components/NoChatcontainer'
import ChatContainer from '../components/ChatContainer'

export default function HomePage() {

  const {selectedUser}=useChatStore();

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-full max-w-6xl mx-auto h-full flex'>
    <Sidebar/>
      {!selectedUser ? <NoChatcontainer/>:<ChatContainer/>}
      </div>

    </div>
  )
}
