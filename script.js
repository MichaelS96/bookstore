function renderBooks() {
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const bookImage = book.image;

        let bookCardHTML = `
        <div class="book-card">
            <div class="book-header">${book.name}</div>
            <div class="separator"></div>
            <div class="book-image"><img src="assets/img/${bookImage}" alt="${book.name}" /></div>
            <div class="separator"></div>         
            <div class="book-info">
                <div class="book-price"><strong>Preis:</strong> ${book.price} €</div>
                <div><strong>Autor:</strong> ${book.author}</div>
                <div><strong>Genre:</strong> ${book.genre}</div>
                <div><strong>Veröffentlicht:</strong> ${book.publishedYear}</div>
                <div class="separator"></div>
                <div class="comments-header">
                    <h2>Kommentare</h2>
                    <div class="like-container">
                        <img class="like-img" id="likeImg${i}" src="assets/like/like.png" alt="like-button" onclick="toggleLike(${i})">
                        <span id="likeCounter${i}">${book.likes}</span>
                    </div>
                </div>
                <div class="input-send">
                    <input type="text" class="comment-name" id="commentName${i}" placeholder="Name">
                    <input type="text" class="comment-input" id="commentInput${i}" placeholder="Bewertung">
                    <img class="send-img" src="assets/img/send-icon.png" alt="absenden-img" onclick="addComment(${i})">
                </div>
            </div>
            <div class="commentary">
                <div class="comments-section" id="comments${i}">${getComments(book.comments)}</div>
            </div>
        </div>`;

        container.innerHTML += bookCardHTML;
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
        const newComment = { name: nameText, comment: commentText };
        books[i].comments.unshift(newComment);

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