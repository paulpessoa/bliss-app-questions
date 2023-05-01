import { useState } from 'react';
import Button from './Button';

const ShareContent = () => {
  const [modalShare, setModalShare] = useState(false);
  const [destination_email, setEmail] = useState('');

  const handleCopy = () => {
    const content_url = window.location.href;
    navigator.clipboard.writeText(content_url);
  };

  const handleSendEmail = async () => {
    const content_url = window.location.href;
    // api.com/share?destination_email=destination_email&content_url=content_url
    const body = {
      content_url,
      destination_email,
    };
    const response = await fetch('https://api/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(response);
    setModalShare(false);
  };

  return (
    <>
      <Button className="outlined-button" title="Share" functionButton={() => setModalShare(true)} />
      {modalShare && (
        <div className="modal-share" onClick={() => setModalShare(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Share by mail</h2>
            <input placeholder="user@mail.com" value={destination_email} onChange={(e) => setEmail(e.target.value)} />
            <div className="modal-buttons">
            <Button className="outlined-button" title="Copy link" functionButton={() => handleCopy()} />
            <Button className="primary-button" title="Send now" functionButton={() => handleSendEmail()} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareContent;
