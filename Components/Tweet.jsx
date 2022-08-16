import React from "react";
import {
  EmojiHappyIcon,
  MusicNoteIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import Axios from "axios";
import { useRouter } from "next/router";
import { postAction } from "../actions/postAction";
import { useDispatch } from "react-redux";

export default function Tweet(props) {
  const [tweet, setTweet] = React.useState("");
  const [images, setImages] = React.useState("");
  const [button, setButton] = React.useState(true);
  const [selectedImg, setSelectedImg] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const filePickerRef = React.useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const btnPost = async () => {
    try {
      if (loading) {
        return;
      } else {
        setLoading(true);
        let formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({
            id: data.idusers,
            text: tweet,
          })
        );
        formData.append("images", images);
        setTimeout(() => {
          Axios.post("http://localhost:3105" + "/tweet/add", formData)
            .then((res) => {
              console.log("berhasil");
              props.function();
              setTweet("");
              setImages("");
              setSelectedImg(null);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addImage = (e) => {
    setImages(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedImg(readerEvent.target.result);
    };
  };

  React.useEffect(() => {
    let text = tweet.replace(/^\s+|\s+$/gm, "");
    if (text) {
      setButton(false);
    } else if (!text) {
      setButton(true);
    }
  }, [tweet]);

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
    <div className="flex border-b border-secondaryHover p-3 space-x-3">
      <img
        src={data.user_profilepicture? 'http://localhost:3105' + data.user_profilepicture : '/default.jpg'}
        alt="profile-img"
        className="aspect-square h-11 w-11 rounded-full cursor-pointer hover:brightness-90" style={{border: '1px solid #040615'}}
      />
      <div className="w-full divide-y divider-gray-300">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
            rows="2"
            placeholder="What's happening?"
            maxLength="300"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          ></textarea>
        </div>
        {selectedImg && (
          <div className="relative">
            <XIcon
              className="h-7 border m-1 border-white text-black absolute cursor-pointer font-bold rounded-full"
              onClick={() => setSelectedImg(null)}
            />
            <img
              src={selectedImg}
              className={`${loading && "animate-pulse"}`}
            />
          </div>
        )}
        <div className="flex items-center justify-between pt-2.5">
          {!loading && (
            <>
              <div className="flex">
                <div className="" onClick={() => filePickerRef.current.click()}>
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImage}
                  />
                  <PhotographIcon className="h-10 w-10 hoverEmoji p-2 text-sky-500 hover:text-sky-200" />
                </div>
                <MusicNoteIcon className="h-10 w-10 hoverEmoji p-2 text-sky-500 hover:text-sky-200" />
                <EmojiHappyIcon className="h-10 w-10 hoverEmoji p-2 text-sky-500 hover:text-sky-200" />
              </div>
              <button
                disabled={button}
                className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-90 disabled:opacity-50 disabled:hover:brightness-100"
                onClick={btnPost}
              >
                Post
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
