import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'
import { getDatabase, get, ref, set, push, query, orderByChild, limitToLast } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js'

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "https://cas-bin-a69e7-default-rtdb.firebaseio.com/",
  authDomain: "cas-bin.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://cas-bin-a69e7-default-rtdb.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
}

const app = initializeApp(firebaseConfig)

// Get a reference to the database service
const db = getDatabase()

function createComment(pid, text) {
    var now = new Date()
    set(push(ref(db, "comments/" + pid)), {
        content: text,
        timestamp: Date.parse(now),
    })
    return "left a comment"
}

function createPost(title, text, publicize, allowcom) {
    var now = new Date()
    set(push(ref(db, "posts")), {
        title: title,
        content: text,
        timestamp: Date.parse(now),
        public: publicize,
        comments: allowcom,
    })
    return "post created"
}

function addQuick() {
    return createPost("post", document.getElementById("postContentBox").value, true, true)
}

function getPosts() {
    ref(db, 'posts').orderByChild('timestamp').limitToLast(10).on('child_added', (snapshot) => {
        value = snapshot.val()
        console.log("post id: "+snapshot.key+"\npost title: "+value.title+"\ncontent: "+value.content);
    });
}

window.createComment = createComment
window.createPost = createPost
window.addQuick = addQuick
window.getPosts = getPosts
