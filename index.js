// Não toque aqui, se não o seu PC vai pegar vírus 🦠😷☣️
document.addEventListener('DOMContentLoaded', function () {
    const albums = document.querySelectorAll('.album');

    const carouselInner = document.querySelector('.carousel-inner');
    const carouselIndicators = document.querySelector('.carousel-indicators');

    function createCarouselItem(element, title, description, isActive = false) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (isActive) {
            carouselItem.classList.add('active');
        }

        if (element.tagName === 'IMG') {
            const img = document.createElement('img');
            img.src = element.src;
            img.alt = title;
            img.style.height = "500px";
            img.style.objectFit = "cover";
            img.classList.add('carousel-image');
            carouselItem.appendChild(img);
        } else if (element.tagName === 'IFRAME') {
            const iframe = document.createElement('iframe');
            iframe.src = element.src;
            iframe.width = element.width;
            iframe.height = element.height;
            iframe.title = element.title;
            iframe.frameborder = element.frameborder;
            iframe.allow = element.allow;
            iframe.allowfullscreen = element.allowfullscreen;
            iframe.style.height = "500px";
            carouselItem.appendChild(iframe);
        }

        const carouselCaption = document.createElement('div');
        carouselCaption.classList.add('carousel-caption', 'd-none', 'd-md-block');

        const captionTitle = document.createElement('h5');
        captionTitle.textContent = title;
        carouselCaption.appendChild(captionTitle);

        const captionDescription = document.createElement('p');
        captionDescription.textContent = description;
        carouselCaption.appendChild(captionDescription);

        carouselItem.appendChild(carouselCaption);

        return carouselItem;
    }

    function populateCarousel(clickedIndex) {
        carouselInner.innerHTML = '';
        carouselIndicators.innerHTML = '';

        albums.forEach((album, index) => {
            const imgElement = album.querySelector('img');
            const iframeElement = album.querySelector('iframe');
            const title = album.querySelector('h3').textContent;
            const description = album.querySelector('p').textContent;

            const element = imgElement || iframeElement;
            const carouselItem = createCarouselItem(element, title, description, index === clickedIndex);
            carouselInner.appendChild(carouselItem);

            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-bs-slide-to', index.toString());
            if (index === clickedIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            }
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);
            carouselIndicators.appendChild(indicator);
        });
    }

    albums.forEach((album, index) => {
        album.addEventListener('click', function () {
            populateCarousel(index);
        });
    });
});
