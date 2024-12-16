function displayBooks() {
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    for (let i = 0; i < books.length; i++) {
        const book = books[i];             // packt die buecher ins HTML 
        const bookImage = bookImg[i];      // packt die bilder ins HTML 

        let bookCardHTML = `             
        <div class="book-card">
            <div class="book-header">${book.name}</div>
            <div class="separator"></div>
            <div class="book-image">
                <img src="assets/img/${bookImage}" alt="${book.name}" />
            </div>
            <div class="separator"></div>         
            <div class="book-info">
                <div class="book-price"><strong>Preis:</strong> ${book.price} €</div>
                <div><strong>Autor:</strong> ${book.author}</div>
                <div><strong>Genre:</strong> ${book.genre}</div>
                <div><strong>Veröffentlicht:</strong> ${book.publishedYear}</div>
                <div class="separator"></div>
                <h2>Kommentare</h2>
                <div class="input-send">
                    <input type="text" class="comment-name" id="commentName-${i}" placeholder="Name">
                    <input type="text" class="comment-input" id="commentInput-${i}" placeholder="Bewertung hinterlassen">
                    <img class="send-img" src="assets/img/send-icon.png" alt="absenden-img" onclick="addComment(${i})">
                </div>
            </div>
            <div class="commentary">
                <!-- Kommentar-Bereich -->
                <div class="comments-section" id="comments-${i}">
                    <!-- Kommentare hinzufügen -->
                    ${getCommentsHTML(book.comments)}
                </div>
            </div>
        </div>`;

        container.innerHTML += bookCardHTML;
    }
}

function addComment(i) {
    const nameInput = document.getElementById(`commentName-${i}`);
    const commentInput = document.getElementById(`commentInput-${i}`);
    const nameText = nameInput.value;
    const commentText = commentInput.value;

    if (nameText && commentText) {
        const newComment = { name: nameText, comment: commentText };  // neues Kommentar erstellen
        books[i].comments.unshift(newComment);  // kommentar am anfang einfuegen

        const commentsSection = document.getElementById(`comments-${i}`);  // kommentarbereich akutalisieren
        commentsSection.innerHTML = '';

        commentsSection.innerHTML = getCommentsHTML(books[i].comments);// kommentare neu rendern lassen

        nameInput.value = '';     // eingabefelder werden zurueckgesetzt
        commentInput.value = '';
    }
}

function getCommentsHTML(comments) {
    let commentsHTML = '';

    for (let i = 0; i < comments.length; i++) {
        commentsHTML += `<p><strong>${comments[i].name}:</strong> ${comments[i].comment}</p>`;
    }

    return commentsHTML;
}
