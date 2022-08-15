import React from 'react';
import Axios from 'axios';

export default function TweetReply(props) {
  const [button, setButton] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [textField, setTextField] = React.useState('');

  const onPost = async() => {
    try {
      let res = await Axios.post(`http://localhost:3105/comment/add/${props.id}`, {
        text,
        idusers
      });
      if (res.data.success) {

      }
    } catch (error) {
      
    }
  }

  React.useEffect(() => {
    let token = localStorage.getItem('diskchord');
    if (token) {
      Axios.get('http://localhost:3105/auth/keep', {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.idusers) {
          setData(res.data);
        }
      })
    }
  })
  return (
    <div className='flex border-b border-secondaryHover p-3 space-x-3'>
      <img src={data.user_profilepicture ? 'http://localhost:3105' + data.user_profilepicture : '/default.jpg'} alt="profile-img" className='aspect-square h-11 w-11 rounded-full cursor-pointer hover:brightness-90'/>

      <div className='w-full divide-y divider-gray-300'>
        <input 
          type="text" 
          className='w-full border-none focus:ring-0 text-md placeholder-gray-700'
          placeholder='Write your thoughts...' 
          maxLength='300'
          onChange={(e) => setTextField(e.target.value)}
        />
        <div className='flex items-center justify-end pt-2.5'>
          <button 
            className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50 disabled:hover:brightness-100'
            disabled={button}
            onClick={onPost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

