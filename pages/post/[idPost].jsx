import { useRouter } from 'next/router'
import React from 'react'
import Comment from '../../Components/Comment'
import DirectMessage from '../../Components/DirectMessage'
import PostDetails from '../../Components/PostDetails'
import Sidebar from '../../Components/Sidebar'
import TweetReply from '../../Components/TweetReply'

export default function Post() {
  const router = useRouter();
  const query = router.query;

  const idPost = query.idPost;

  React.useEffect(() => {
    console.log(idPost);
  }, [idPost])
  return (
    <div>
      <section className='flex min-h-screen max-w-7xl mx-auto'>
        <Sidebar active='explore'/>
        <PostDetails/>
      </section>
      <DirectMessage/>
    </div>
  )
}
