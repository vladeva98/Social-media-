document.addEventListener('DOMContentLoaded', function () {
    const feedContainer = document.getElementById('socialMediaFeed');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const themeToggle = document.getElementById('themeToggle');
    let darkMode = false;
    let startIndex = 0;
    const postsPerPage = 2;
    let initialLoad = true;

    function fetchPosts() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => displayPosts(data.posts))
            .catch(error => console.error('Error fetching data:', error));
    }
    
    function displayPosts(posts) {
        const endIndex = startIndex + postsPerPage;
        const visiblePosts = posts.slice(startIndex, endIndex);
    
        visiblePosts.forEach(post => {
            // tochna data
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    
            // update
            post.date = formattedDate;
    
            const postElement = createPostElement(post);
            feedContainer.appendChild(postElement);
        });
    
        startIndex += postsPerPage;
    
        if (startIndex >= posts.length) {
            loadMoreBtn.disabled = true;
        }
    }
    

    fetchPosts();

    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const imageElement = document.createElement('img');
        imageElement.src = post.image;
        imageElement.alt = post.caption;
        imageElement.addEventListener('click', () => openImageLightbox(post.image));

        const captionElement = document.createElement('p');
        captionElement.textContent = post.caption;

        const authorElement = document.createElement('p');
        authorElement.textContent = `By ${post.name} on ${post.date}`;

        postElement.appendChild(imageElement);
        postElement.appendChild(captionElement);
        postElement.appendChild(authorElement);

        return postElement;
    }

    function openImageLightbox(imageUrl) {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const enlargedImage = document.createElement('img');
        enlargedImage.src = imageUrl;
        enlargedImage.alt = 'Enlarged Image';

        const closeModalBtn = document.createElement('span');
        closeModalBtn.classList.add('close');
        closeModalBtn.innerHTML = '&times;';
        closeModalBtn.addEventListener('click', () => closeModal(modal));

        modalContent.appendChild(enlargedImage);
        modalContent.appendChild(closeModalBtn);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        modal.addEventListener('click', () => closeModal(modal));
        modalContent.addEventListener('click', (event) => event.stopPropagation());
    }

    function closeModal(modal) {
        document.body.removeChild(modal);
    }

    function toggleTheme() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-theme', darkMode);
    }

    loadMoreBtn.addEventListener('click', () => fetchPosts());
    themeToggle.addEventListener('change', () => toggleTheme());

    
    fetchPosts();
});
