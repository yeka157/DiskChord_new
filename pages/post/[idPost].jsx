import { useRouter } from 'next/router'
import React from 'react'
import Comment from '../../Components/Comment'
import DirectMessage from '../../Components/DirectMessage'
import PostDetails from '../../Components/PostDetails'
import Sidebar from '../../Components/Sidebar'
import TweetReply from '../../Components/TweetReply'

export default function Post() {
  const router = useRouter();
  const { idPost } = router.query;

  React.useEffect(() => {
    console.log(router.query);
  }, [])
  return (
    <div>
      <section className='flex min-h-screen max-w-7xl mx-auto'>
        <Sidebar active='explore'/>
        <PostDetails params={router.query}/>
        <Comment/>
        <TweetReply/>
      </section>
      <DirectMessage/>
    </div>
  )
}
