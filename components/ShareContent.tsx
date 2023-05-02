import { useState } from 'react';
import Button from './Button';
import api from '../api'

const ShareContent = () => {
  const [modalShare, setModalShare] = useState(false);
  const [destination_email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('')
  const handleCopy = () => {
    const content_url = window.location.href;
    navigator.clipboard.writeText(content_url);
  };

  const handleSendEmail = async () => {
    const content_url = window.location.href;
    const body = {
      content_url,
      destination_email,
    };
    try {
      await api.post('/rest/v1/share', body);
      setMsg('Email successfully sent!')
      setEmail('')
      setTimeout(() => {
        setMsg('');
        setModalShare(false)
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);

    if (!validateEmail(destination_email)) {
      setError('Invalid e-mail format');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!validateEmail(destination_email)) {
      setError('Invalid e-mail format');
    } else {
      handleSendEmail();
    }
  };

  return (
    <>
      <Button className="outlined-button" title="Share" functionButton={() => setModalShare(true)} />
      {modalShare && (
        <div className="modal-share" onClick={() => setModalShare(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Share by mail</h2>
            <input placeholder="user@mail.com" value={destination_email} type='email' required onChange={handleChange} />
            {error && <span className="wrong">{error}</span>}
            <div className="modal-buttons">
              <Button className="outlined-button" title="Copy link" functionButton={() => handleCopy()} />
              <Button className="primary-button" title="Send now" functionButton={() => handleSubmit()} />
            </div>
            {msg && <span className="msg">{msg}</span>}
          </div>
        </div >
      )}
    </>
  );
};

export default ShareContent;
