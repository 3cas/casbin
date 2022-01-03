import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'
import { getDatabase, get, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js'

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
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

function createComment(pid, text) {
    const db = getDatabase();
    set(ref(db, "comments/" + pid + "/" + "1"), {
        content: text,
        timestamp: 0
    });
    return "left a comment";
}

function createPost(title, text, publicize) {
    const db = getDatabase();
    set(ref(db, "posts/" + "1"), {
        title: text,
        content: text,
        timestamp: 0,
        public: publicize
    });
    return "post created";
}
  
function addQuick() {
    return createPost("post", document.getElementById("postContentBox").value, true);
}