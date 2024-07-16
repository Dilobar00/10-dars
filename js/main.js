let elUsersList = document.querySelector(".user-list");
let elPostList = document.querySelector(".post-list");
let elCommentList = document.querySelector(".comment-list");


fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    data.splice(0, 20).forEach((item) => {
      let elUserItem = document.createElement("li");
      elUserItem.className =
        "w-full p-5 bg-[#A3C6D5] rounded-[20px] flex flex-col";
      elUserItem.innerHTML = `
            <p>ID: <strong>${item.id}</strong></p>
            <p class="mt-2 inline-block">Name: <strong>${item.name}</strong></p>
            <p class="mt-2 inline-block">Username: <strong>${item.username}</strong></p>
            <button onclick="showPosts(${item.id})" class="py-[4px] bg-[#558EA6] text-black w-full mt-2 rounded-md hover:opacity-[70%]">Show post</button>
        `;
      elUsersList.appendChild(elUserItem);
    });
  });


function showPosts(id) {
  elPostList.innerHTML = `<img src="./loading.png" width="100" height="100"/>`;
  elCommentList.innerHTML = null;
  setTimeout(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        elPostList.innerHTML = null;
        data.forEach((item) => {
          let elPostItem = document.createElement("li");
          elPostItem.className = "w-full p-5 bg-[#AFD0DB] rounded-[20px]";
          elPostItem.innerHTML = `
                    <p>ID: <strong>${item.id}</strong></p>
                    <p>UserID: <strong>${item.userId}</strong></p>
                    <p class="mt-2 inline-block">Title: <strong>${item.title}</strong></p>
                    <p class="mt-2 inline-block">Body: <strong>${item.body}</strong></p>
                     <button onclick="showComment(${item.id})" class="py-[4px] bg-[#CEE1EA] text-black w-full mt-2 rounded-md hover:opacity-[70%]">Show comment</button>
                `;
          elPostList.appendChild(elPostItem);
        });
      });
  }, 1000);
}


function showComment(id) {
  elCommentList.innerHTML = `<img src="./loading.png" width="100" height="100"/>`;
  setTimeout(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        elCommentList.innerHTML = null;
        data.forEach((item) => {
          let elCommentItem = document.createElement("li");
          elCommentItem.className = "w-full p-5 bg-[#CEE1EA] rounded-[20px]";
          elCommentItem.innerHTML = `
                    <p>ID: <strong>${item.id}</strong></p>
                    <p>PostId: <strong>${item.postId}</strong></p>
                    <p class="mt-2 inline-block">Name: <strong>${item.name}</strong></p>
                    <p class="mt-2 inline-block">Email: <strong>${item.email}</strong></p>
                    <p class="mt-2 inline-block">Body: <strong>${item.body}</strong></p>
                `;
          elCommentList.appendChild(elCommentItem);
        });
      });
  }, 1000);
}
