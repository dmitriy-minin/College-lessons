document.addEventListener('DOMContentLoaded', () => {
    // Находим все блоки с подсветкой Rouge
    const codeBlocks = document.querySelectorAll('.highlight');

    codeBlocks.forEach((block) => {
        // Создаем кнопку
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        button.innerText = 'Copy';

        // Добавляем кнопку в блок
        block.appendChild(button);

        button.addEventListener('click', () => {
            // Ищем текст внутри префикса pre или code
            const code = block.querySelector('code').innerText;

            navigator.clipboard.writeText(code).then(() => {
                button.innerText = 'Copied!';
                button.classList.add('copied');

                // Возвращаем исходный вид через 2 секунды
                setTimeout(() => {
                    button.innerText = 'Copy';
                    button.classList.remove('copied');
                }, 2000);
            });
        });
    });
});