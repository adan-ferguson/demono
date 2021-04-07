import './styles/main.sass'
import { GameContainer } from './views/gameContainer'

const gameContainer = new GameContainer()
document.body.prepend(gameContainer.element)
gameContainer.start()