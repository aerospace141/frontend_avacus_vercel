import React, { useState, useEffect } from 'react';
import '../../styles/user_auth/SettingsPage.css';
import { FaArrowLeft, FaBell, FaDownload, FaKey, FaLanguage, FaLock, FaSignOutAlt, FaTrash, FaUser } from "react-icons/fa";
import Switch from "../ui/switch";
import Button from "../ui/button";
import { useNavigate } from 'react-router-dom';


const SettingsPage = ({ userData, onLogout, onPasswordChange, onAccountDelete }) => {
      const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const [password, setPassword] = useState('');
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  // const handleAccountDelete = async () => {

  
    const handleAccountDelete = async () => {   
       const token = localStorage.getItem('token'); // Retrieve token from local storage

      try {
        // Step 1: Verify user identity
        const verifyResponse = await fetch('https://server-avacus.vercel.app/api/users/delete/verify', {
          method: 'POST',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });
  
        if (!verifyResponse.ok) {
          throw new Error('Verification failed. Please try again.');
        }
  
        // Step 2: Proceed with account deletion
        const deleteResponse = await fetch('https://server-avacus.vercel.app/api/users/delete', {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!deleteResponse.ok) {
          throw new Error('Failed to delete account.');
        }
  
        alert('Account deleted successfully!');
        setIsVerificationModalOpen(false);
        navigate('/goodbye'); // Redirect to goodbye page
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    };
  

  // };
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
  
    // Redirect the user to the login page
    navigate('/login');
  };

  const handleOpenPasswordUpdate = () => {
    const newTab = window.open('/update-password', '_blank', 'noopener,noreferrer');
    if (!newTab) {
      alert('Please allow pop-ups for this site.');
    }
  
  };

  const handleOpenPasswordPopup = () => {
    const popup = window.open(
      '/update-password',
      'PasswordUpdateWindow',
      'width=500,height=600,left=100,top=100,noopener,noreferrer'
    );
  
    const messageListener = (event) => {
      if (event.origin !== window.location.origin) return; // ensure security
  
      if (event.data === 'password-updated') {
        alert('Password updated successfully!');
      } else if (event.data === 'password-update-cancelled') {
        alert('Password update was cancelled.');
      }
  
      window.removeEventListener('message', messageListener);
      popup?.close();
    };
  
    window.addEventListener('message', messageListener);
  };
  

    return (
      <>
      <div className="settings-container">
      <div className="settings-header">
      <button className="back-button-s" onClick={() => navigate('/')}>
            <FaArrowLeft />
          </button>
        <h2 className="settings-title">Settings</h2>
        </div>
        <div className="settings-list">
          <SettingItem icon={<FaLock />} text="Manage Subscription" />
          <div  className='setting-item' onClick={() => navigate('/subscription')}>
            <FaUser />          
            <button className='SettingItem'>Link Organization Subscription</button>
          </div>
          {/* <SettingItem icon={<FaUser />} text="Link Organization Subscription" /> */}
          {/* <SettingItem icon={<FaUser />} text="Account Settings" /> */}
          <div  className='setting-item' onClick={() => navigate('/profile')}>
            <FaUser />          
            <button className='SettingItem' >Account Settings</button>
          </div>
          {/* <SettingItem   onClick={handleOpenPasswordUpdate} icon={<FaKey />} text="Change Password" /> */}
          <div  className='setting-item'  onClick={handleOpenPasswordPopup}
          >
            <FaKey />          
            <button className='SettingItem' >Change Password</button>
          </div>
          <SettingItem icon={<FaBell />} text="Notifications" />
          <SettingItem  icon={<FaDownload />} text="Downloads" />
          
          <ToggleSetting text="Show Streaks" />
          <ToggleSetting text="Auto-Play Next Movement Session" />
          
          {/* <SettingItem icon={<FaLanguage />} text="Change Language" /> */}
          <div  className='setting-item' onClick={() => navigate('/language-settings')}>
            <FaLanguage />          
            <button className='SettingItem'>Change Language</button>
          </div>
          <SettingItem icon={<FaUser />} text="Apple Health" />
          
          {/* <Button className="logout-button">
            <FaSignOutAlt /> Logout
          </Button>
          <Button className="delete-button">
            <FaTrash /> Delete Profile
          </Button> */}

            <button 
              className="settings-button logout-button" 
              onClick={() => setIsLogoutModalOpen(true)} // Open confirmation modal
              >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>

      {/* LOGOUT MODAL */}
      {isLogoutModalOpen && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2>Logout Account</h2>
            <p>Are you sure you want to Logout your account? This action cannot be undone.</p>
            <div className="delete-modal-buttons">
              <button 
                className="cancel-button"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleLogout}
              >
                Logout Account
              </button>
            </div>
          </div>
        </div>
      )}

        <button 
          className="settings-button delete-button" 
          // onClick={() => setIsDeleteModalOpen(true)}
          onClick={() => setIsVerificationModalOpen(true)}
        ><FaTrash />
          <span>Delete Account</span>
        </button>
      {/* </div> */}



      {isVerificationModalOpen && (
        <div className="verification-modal delete-modal">
          <div className="modal-content delete-modal-content">
            <h2>Verify Your Identity</h2>
            <p>Please enter your password to confirm account deletion:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <div className="delete-modal-buttons">
              <button onClick={() => setIsVerificationModalOpen(false)}                 className="cancel-button"
              >Cancel</button>
              <button className="confirm-delete-button"
               onClick={handleAccountDelete}>Confirm</button>
            </div> 
          </div>
        </div>
      )}
        </div>

      </div>
        {/* <div className="mpd-footer bg-slate-800 p-4 fixed bottom-0 w-full flex justify-around border-t border-slate-700">
        <button className="mpd-nav-btn flex flex-col items-center" onClick={() => navigate('/')} >
          <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1 text-slate-400">Home</span>
        </button>
        <button className="mpd-nav-btn flex flex-col items-center" onClick={() => navigate('/play')}>
          <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs mt-1 text-slate-400">Play</span>
        </button>
        <button className="mpd-nav-btn flex flex-col items-center"           onClick={() => navigate('/')}>
          <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs mt-1 text-slate-400">Stats</span>
        </button>
        <button className="mpd-nav-btn flex flex-col items-center">
          <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs mt-1 text-purple-500 font-bold"onClick={() => setActiveTab('Setting')}>Settings</span>
        </button>
      </div> */}
      </>
    );
  };
  
  const SettingItem = ({ icon, text }) => (
    <div className="setting-item">
      {icon}
      <span>{text}</span>
    </div>
  );
  
  const ToggleSetting = ({ text }) => (
    <div className="toggle-setting">
      <span>{text}</span>
      <Switch defaultChecked />
    </div>
  );
  
  export default SettingsPage;
  