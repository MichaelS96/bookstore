function displayBooks() {
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const bookImage = bookImg[i];

        const bookCardHTML = `             
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
                <div class="input-send"><input type="text" placeholder="Bewertung hinterlassen"> <img class="send-img" src="assets/img/send-icon.png" alt="absenden-img" onclick=''> </div>
            </div>
        </div>`;
        container.innerHTML += bookCardHTML; // HTML-Code hinzufuegen
    }
}