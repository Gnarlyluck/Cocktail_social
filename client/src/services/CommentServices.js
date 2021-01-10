import ApiClient from './ApiServices'

export const __CreateComment = async( formData) => {
    try{
        const res = await ApiClient.post(
            `/comment/${formData.user_id}/drink_posts/${formData.drink_posts_id}`, {content:formData.content})
            console.log(res.data)
            return res.data
    }catch(error){
        console.log('__CreateComment ERROR!!!!')
        throw error
    }
}

export const __GetCommentsByPost = async(drinkPostId) => {
    try{
        const res = await ApiClient.get(`/view/${drinkPostId}`)
        // console.log(res.data)
        return res.data
    }catch(error){
        console.log('__GetComments ERROR!!!!')
        throw error
    }
}
export const __GetComment = async(commentId) => {
    try{
        const res = await ApiClient.get(`comment/get/${commentId}`)
        // console.log(res.data)
        return res.data
    }catch(error){
        console.log(error, '__GetComment ERROR!!!')
        throw error
    }
}
export const __EditComments = async(comment_id, formData) => {
    try{
        const res = await ApiClient.put(`/comment/edit/${comment_id}`, formData)
        return res.data
    }catch(error){
        console.log(error)
        throw error
    }
}
export const __DeleteComment = async(commentId) => {
    try{
        const res = await ApiClient.delete(`/comment/delete/${commentId}`)
        console.log(res.data)
        return res.data
    }catch(error){
        console.log(error, '__DeleteComment ERROR!!!!')
        throw error
    }
}


{/* <Typography paragraph>
{details.comments.map((comment, index)=> (
  <span >
    <p key={index}>{comment.id}</p>
    <p>{comment.content}</p>
    <MenuItem value={comment.id} onClick={deleteComment} >Delete</MenuItem>
    <span>
      <ul>
        <li>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          {/* <MenuItem value={comment.id} onClick={deleteComment} >Delete</MenuItem> */}
        // </Menu>
        // </li>
    //   </ul>
    // </span>
//   </span>
// ))}
// </Typography> */}