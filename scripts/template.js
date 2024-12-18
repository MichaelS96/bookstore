function generateBookCards(book, i) {
    return `
    <div class="book-card">
        <div class="book-header">${book.name}</div>
        <div class="separator"></div>
        <div class="book-image"><img src="assets/img/${book.image}" alt="${book.name}" /></div>
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
}