// Функция прокрутки вверх
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Функция прокрутки вниз
function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function handleScroll() {
    const topBtn = document.getElementById("scrollTopBtn");
    const bottomBtn = document.getElementById("scrollBottomBtn");
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // 1. Порог значимости: страница должна быть длиннее экрана минимум на 200px
    const isLongPage = scrollHeight > clientHeight + 200;

    if (!isLongPage) {
        topBtn.classList.remove("is-visible");
        bottomBtn.classList.remove("is-visible");
        return;
    }

    // 2. Логика для кнопки ВВЕРХ (показываем после 300px прокрутки)
    if (scrollTop > 300) {
        topBtn.classList.add("is-visible");
    } else {
        topBtn.classList.remove("is-visible");
    }

    // 3. Логика для кнопки ВНИЗ
    // Скрываем только когда реально дошли до самого низа (за 50px до конца)
    const isBottom = scrollTop + clientHeight >= scrollHeight - 50;
    if (isBottom) {
        bottomBtn.classList.remove("is-visible");
    } else {
        bottomBtn.classList.add("is-visible");
    }
}

// Слушаем скролл и загрузку
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);