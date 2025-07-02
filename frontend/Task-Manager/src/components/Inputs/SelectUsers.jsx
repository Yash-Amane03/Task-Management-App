import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUser, LuUsers } from 'react-icons/lu';
import Modal from '../Modal';
import AvatarGroup from '../AvatarGroup';

const SelectUsers = ({selectedUsers, setSelectedUsers}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [tempSelectedUsers, setTempSelecedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if(response.data?.length > 0){
        setAllUsers(response.data)
      }
    } catch (error) {
      console.error("Error Fetching Users: ",  error)
    }
  }

  const toggleUserSelection = (userId) => {
    setTempSelecedUsers((prev)=> prev.includes(userId)? prev.filter((id)=> id !== userId): [...prev, userId])
  }

  const  handleAssign = () =>{
    setSelectedUsers(tempSelectedUsers);
    setIsModelOpen(false);
  }

  const selectedUsersAvatar = allUsers.filter((user)=> selectedUsers.includes(user._id)).map((user)=> user.profileImageUrl);

  useEffect(()=>{
    getAllUsers();
  },[]);

  useEffect(()=>{
    if(selectedUsers.length === 0){
      setTempSelecedUsers([]);
    }
    return () => {}
  },[selectedUsers])
  return (
    <div className='space-y-4 mt-2'>
      {selectedUsersAvatar.length === 0 && (
        <button className='card-btn' onClick={()=>setIsModelOpen(true)}>
          <LuUsers className='text-sm ' /> Add Members
        </button>
      )}
      {selectedUsersAvatar.length > 0 && (
        <button className="cursor-pointer" onClick={()=> setIsModelOpen(true)}>
          <AvatarGroup avatars={selectedUsersAvatar} maxVisible={3} />
        </button>
      )}
      <Modal 
        isOpen={isModelOpen}
        onClose={()=> setIsModelOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user)=>(
            <div key={user._id} className="flex items-center gap-4 p-3 border-b border-gray-200">
              <img src={user.profileImageUrl} alt={user.name} className='w-10 h-10 rounded-full' />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>
              <input
                type='checkbox'
                checked={tempSelectedUsers.includes(user._id)}
                onChange={()=> toggleUserSelection(user._id)}
                className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-s outline-none '
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button className='card-btn' onClick={()=> setIsModelOpen(false)}>
            CANCEL
          </button>
          <button className="card-btn-fill" onClick={handleAssign}>DONE</button>
        </div>
      </Modal>
    </div>
  )
}

export default SelectUsers
