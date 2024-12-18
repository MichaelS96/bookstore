function renderBooks() {
    const container = document.getElementById('books-container');
    container.innerHTML = ''; // Container leeren

    for (let i = 0; i < books.length; i++) {
        const bookHTML = generateBookCards(books[i], i); // ruft die function generatebookcard afu
        container.innerHTML += bookHTML;
    }
}

function toggleLike(i) {
    const book = books[i];
    const likeCounter = document.getElementById(`likeCounter${i}`);
    const likeImage = document.getElementById(`likeImg${i}`);

    if (book.liked === false) {
        book.likes++;
        book.liked = true;
        likeImage.src = "assets/like/likepressed.png";
    } else {
        book.likes--;
        book.liked = false;
        likeImage.src = "assets/like/like.png";
    }
    
    likeCounter.innerHTML = book.likes;
}

function getComments(comments) {
    let commentsHTML = '';

    for (let i = 0; i < comments.length; i++) {
        commentsHTML += `<p><strong>${comments[i].name}:</strong> ${comments[i].comment}</p>`;
    }

    return commentsHTML;
}

function addComment(i) {
    const nameInput = document.getElementById(`commentName${i}`);
    const commentInput = document.getElementById(`commentInput${i}`);
    const nameText = nameInput.value;
    const commentText = commentInput.value;

    if (nameText && commentText) {
        const newComment = { "name": nameText, "comment": commentText };
        books[i].comments.unshift(newComment);      // versetzt das kommentar noch oben 

        const commentsSection = document.getElementById(`comments${i}`);
        commentsSection.innerHTML = getComments(books[i].comments);

        saveCommentsToStorage();

        nameInput.value = '';
        commentInput.value = '';
    }
}

function saveCommentsToStorage() {
    const commentsData = books.map(book => book.comments); // filter nur die Kommentare
    localStorage.setItem('bookComments', JSON.stringify(commentsData));
}

function loadCommentsFromStorage() {
    const storedComments = localStorage.getItem('bookComments');
    if (storedComments) {
        const commentsData = JSON.parse(storedComments);
        for (let i = 0; i < books.length; i++) {
            if (commentsData[i]) {
                books[i].comments = commentsData[i];
            }
        }
    }
}