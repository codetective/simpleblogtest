let posts;

function fetchPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      posts = [...json];
      seedDOMWithPosts(json);
    });
}
fetchPosts();

const body = document.querySelector("body");
const loadPosts = document.querySelector(".loadPosts");
const loadComments = document.querySelector(".loadComments");
const modal = document.querySelector("#single-post");
const backBtn = document.querySelector("#back");
const postcontainer = document.querySelector("#post-container");
const singlePostContainer = document.querySelector(".post");
const commentListContainer = document.querySelector("#comment-list");

backBtn.addEventListener("click", closeModalView);

function seedPostItem(item, idx) {
  return `
    <div class="blog-post"> <h1>${item.title}</h1>  <p>  ${item.body}  </p><a class="readBtn" href='#' data-idx='${idx}' data-id='${item.id}'>Read More</a> </div>
 `;
}
function seedCommentItem(name, email, body) {
  if (name && email) {
    return `<li class="comment"> <h5 class="commenter-nick">${name}</h5> <h4 class="commenter-mail">${email}</h4> <p>${body}</p></li>`;
  } else {
    return ` <li class="comment"> <h5 class="commenter-nick">${email}</h5><p>${body}</p></li>`;
  }
}

function seedModalView(idx) {
  let item = posts[idx];
  let post = `
  <div class="post">
  <h2 class="post-title">${item.title}</h2>
  <div class="post-body">
   ${item.body}
  </div>
</div>
  `;
  singlePostContainer.innerHTML = post;
}

function showPostInModal(e) {
  modal.classList.add("show");
  body.classList.add("stop-scrolling");
  seedModalView(e.target.dataset.idx);
  fetchcomments(e.target.dataset.id);
  commentListContainer.innerHTML = "";
}

function closeModalView(e) {
  modal.classList.remove("show");
  body.classList.remove("stop-scrolling");
}
function attachClick() {
  if (document.body.addEventListener) {
    document.body.addEventListener("click", clickHandler, false);
  } else {
    document.body.attachEvent("onclick", clickHandler); //for IE
  }
}
function clickHandler(e) {
  e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.className.match(/readBtn/)) {
    showPostInModal(e);
  }
}

function seedDOMWithPosts() {
  loadPosts.classList.remove("show");
  posts.forEach((item, idx) => {
    postcontainer.insertAdjacentHTML("beforeend", seedPostItem(item, idx));
  });
  attachClick();
}
function seedDOMWithComments(comments) {
  loadComments.classList.remove("show");

  comments.forEach((item, idx) => {
    commentListContainer.insertAdjacentHTML(
      "beforeend",
      seedCommentItem(item.name, item.email, item.body)
    );
  });
}

function fetchcomments(id) {
  fetch("https://jsonplaceholder.typicode.com/posts/" + id + "/comments")
    .then((response) => response.json())
    .then((json) => seedDOMWithComments(json));
}
