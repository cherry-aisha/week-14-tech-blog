console.log("test");
const commentButton = document.querySelector("#commentButton");
const commentInputEl = document.querySelector("#commentInput");
const formEl = document.querySelector(".commentForm");

const newCommentHandler = async (event) => {
  //event.preventDefault();
  
   const id = formEl.id;
   console.log(id);

    const text = commentInputEl.value;
    console.log(text);

    if (text) {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          comment_content: text,
          post_id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        //location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };

  
  commentButton.addEventListener('click', newCommentHandler);