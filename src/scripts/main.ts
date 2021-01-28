import '../styles/main.sass'

const mainEl:HTMLElement = document.createElement('main')
mainEl.textContent = 'abc'
document.body.prepend(mainEl)