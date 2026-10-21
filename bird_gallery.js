const galleries = document.querySelectorAll('.gallery');

galleries.forEach(gallery => {
    const birds = gallery.querySelectorAll('.bird');
    const nextBirdBtn = gallery.querySelector('.next_bird');
    const prevBirdBtn = gallery.querySelector('.prev_bird');

    // Każda galeria ma niezalezny licznik zdjec i na nim bazuje dzialanie
    let currentIndex = 0;
    function showBird(index) {
        birds.forEach(bird => {
            bird.classList.remove('bird_base');
        });
        birds[index].classList.add('bird_base');
    }
    
    nextBirdBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % birds.length;
        showBird(currentIndex);
    });

    prevBirdBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + birds.length) % birds.length;
        showBird(currentIndex);
    });
});