import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import {LiaCommentSolid } from "react-icons/lia"
import { FcLikePlaceholder} from "react-icons/fc"
import { Button } from '../Button/Button'

const Post = ({ data }) => {

  const [comment, setCommentPopup] = useState(false);
  const CommentpopUp = () => {
    setCommentPopup(!comment)
  }
  const closeComment = () => {
    setCommentPopup(false);
  }


  const [commentBox, setComment] = useState("");
  const [commentsBoxs, setComments] = useState(["nice one!"]);
  const onClickcomment = () => {
    setComments((commentsBoxs) => [...commentsBoxs, commentBox])
  }

  const onChangeComment = (e) => {
    setComment(e.target.value);
  }



  return (
    <div className="Post card-container">

      <img src={"http://localhost:8080/images/"+data.mediaContent} alt="alt-img" />

      <div className="postReact">
        {/* <img src={data.liked ? Heart : NotLike} alt="" /> */}
        <Button className="button post" icon={< FcLikePlaceholder size={30} />} />
        <Button  onClick={CommentpopUp} className='commentPopbutton post' icon={<LiaCommentSolid size={30} />} /><img src={Comment} alt="" />
        {comment ?
          <div className='maincommentpop'>

            <div className='popUpcomment'>
              <div className='popCommentHeader'>
                <h1>Comment Box...</h1>
                <h1 onClick={closeComment}>X</h1>
              </div>
            </div>
            <div>
              <input type='text' placeholder='comments' value={commentBox} onChange={onChangeComment} className='commentinput' />
              <button onClick={onClickcomment} className='commentPost'>Post</button>
            </div>
          
            <div className='comment-scroll'>
              {commentsBoxs.map((text) => (
                <div className='comment-posting'>comments:<br />{text}</div>
              ))}
            </div>


          </div> : ''}

        <img src={Share} alt="" />
      </div>


      <span style={{ color: "var(--gray)", fontSize: '12px' }}>{data.likes} likes</span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>
    </div>
  )
}

export default Post