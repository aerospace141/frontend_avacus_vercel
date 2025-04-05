import React, { useState } from 'react';
import '../../styles/user_auth/SettingsPage.css';
import { FaBell, FaDownload, FaKey, FaLanguage, FaLock, FaSignOutAlt, FaTrash, FaUser } from "react-icons/fa";
import Switch from "../ui/switch";
import Button from "../ui/button";
import { useNavigate } from 'react-router-dom';


const SettingsPage = ({ userData, onLogout, onPasswordChange, onAccountDelete }) => {
    const navigate = useNavigate();
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAccountDelete = () => {
    onAccountDelete(userData.id);
    setIsDeleteModalOpen(false);
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
      <div className="settings-container">
        <h2 className="settings-title">Settings</h2>
        <div className="settings-list">
          <SettingItem icon={<FaLock />} text="Manage Subscription" />/
                    <div  className='setting-item' onClick={() => navigate('/subscription')}>
            <FaUser />          
            <button className='SettingItem' >Link Organization Subscription</button>
          </div>
          {/* <SettingItem icon={<FaUser />} text="Link Organization Subscription" /> */}
          {/* <SettingItem icon={<FaUser />} text="Account Settings" /> */}
          <div  className='setting-item' onClick={()=>navigate('/profile')}>
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
          
          <SettingItem icon={<FaLanguage />} text="Change Language" />
          <SettingItem icon={<FaUser />} text="Apple Health" />
          
          {/* <Button className="logout-button">
            <FaSignOutAlt /> Logout
          </Button>
          <Button className="delete-button">
            <FaTrash /> Delete Profile
          </Button> */}

          <div className="settings-item logout" onClick={onLogout}>
          <span>Logout</span>
        </div>

        <div 
          className="settings-item delete-account" 
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <span>Delete Account</span>
        </div>
      {/* </div> */}

      {isDeleteModalOpen && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="delete-modal-buttons">
              <button 
                className="cancel-button"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleAccountDelete}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>

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
  