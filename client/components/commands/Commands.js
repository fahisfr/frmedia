import React from 'react'
import styles from './Commands.module.css'
import AddPost from '../addPost/AddPost'
import Post from '../post/Post'


function Commands() {


  const Type= {
    type:"Command",
    placeholder:"Write a command",

  }

  return (
    <div className='center' >
        <Post />
          <AddPost Type={Type} />
          {
            new Array(10).fill(0).map((_, i) =>{
              return(
                 <Post />
              )
            } )
          }
    </div>
  )
}

export default Commands