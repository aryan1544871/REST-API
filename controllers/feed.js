exports.getPosts = (req,res,next) =>{
res.status(200).json ({
    posts: [
        {_id : '1', title : 'First Post', content : 'This is the first post', creator : {name : 'Aryan'}, createdAt : new Date ()},
        {_id : '2', title : 'Second Post', content : 'This is the second post', creator : {name : 'Mayank'}, createdAt : new Date ()}, 
        {_id : '3', title : 'Third Post', content : 'This is the third post', creator : {name : 'Satyam'}, createdAt : new Date ()}]
})
};

exports.createPost = (req,res,next) =>{
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message : 'Post created successfully',
        post : {id : new Date ().toISOString(),title : title , content : content}
    })
}