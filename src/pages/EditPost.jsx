import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { service } from '../appwrite/dbConfig'

function EditPost() {
    const [posts,setPosts] = useState(null)
    const navigate = useNavigate()
    const slug = useParams()
    useEffect(()=>{
        if(slug){
            service.getPost(slug)
            .then((post) => {
                if(post) setPosts(post)
            })
        } else{
            navigate('/')
        }
    },[slug,navigate])
  return posts? (
    <div>
        <Container>
            <PostForm post={posts} />
        </Container>
    </div>
  ):(null)
}

export default EditPost