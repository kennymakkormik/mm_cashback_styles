javascript:(function(){
    const stylesUrl = 'https://raw.githubusercontent.com/kennymakkormik/mm_cashback_styles/main/mm_cashback.styles.css';
    const jsUrl = 'https://raw.githubusercontent.com/kennymakkormik/mm_cashback_styles/main/for_test.mm_cashback.min.js';

    const scriptTag = document.createElement('script');
    const stylesTag = document.createElement('style');

    setStartButton.proc = null;

    

    if (!window.BCPasted) {
        fetch(jsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('JS');
            }
            return response.text();
        })
        .then(jsContent => {
            scriptTag.innerHTML = jsContent;
            document.head.insertAdjacentElement('beforeend', scriptTag);
        })
        .then(function() {
            fetch(stylesUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('JS');
                }
                return response.text();
            })
            .then(stylesContent => {
                stylesTag.innerHTML = stylesContent;
                document.head.insertAdjacentElement('beforeend', stylesTag);
                window.BCPasted = true;
                setStartButton();
            })
        })
    } else {
        if (!document.getElementById('#bc-id-start-button')) {
            setStartButton();
        } else {
            console.log('btn is exist...');
        }
    }

    function setStartButton() {
        console.log('btn add...')
        // Создаем кнопку
        var button = document.createElement("button");
        button.id = 'bc-id-start-button';

        // Задаем функцию, которая будет вызываться при нажатии на кнопку
        button.onclick = function() {
            if (button.classList.contains('bc-stop-searching')) return;
            if (!setStartButton.proc) {
                setStartButton.proc = new Processor();
            }
            setStartButton.proc.start();
        };

        // Вставляем div с кнопкой в тело документа (или другой элемент, куда вы хотите добавить кнопку)
        document.body.insertAdjacentElement('afterbegin', button);
    }
})();