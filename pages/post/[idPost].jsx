import { useRouter } from 'next/router'
import React from 'react'
import Comment from '../../Components/Comment'
import DirectMessage from '../../Components/DirectMessage'
import PostDetails from '../../Components/PostDetails'
import Sidebar from '../../Components/Sidebar'
import TweetReply from '../../Components/TweetReply'
import Axios from 'axios';

export default function Post(props) {
  // const router = useRouter();
  // const query = router.query;

  // const idPost = query.idPost;

  // React.useEffect(() => {
  //   // console.log(idPost);
  //   console.log(props.idPost);
  // }, []);

  return (
    <div>
      <section className='flex min-h-screen max-w-7xl mx-auto'>
        <Sidebar active='explore'/>
        <PostDetails params={props.idPost}/>
      </section>
      <DirectMessage/>
    </div>
  )
}

export async function getStaticPaths (context) {
  try {
    let result = await Axios.get('http://localhost:3105/tweet/all');
    // console.log(result);
    let paths = [];
    for (let i = 0; i<result.data.length; i++) {
      paths.push({params : {idPost : `${result.data[i].idPost}`}});
    }
    // console.log(paths);
    // console.log(context);
    return {
      paths,
      fallback : false
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps (context) {
  // console.log(context);
  // console.log(context.params);
  return {
    props : {
      obj : {},
      idPost : context.params.idPost
    }
  }
}
