import {Select} from './Select/Select'
import './styles.sass'

const select = new Select('#select', {
  placeholder: "Choose an element",
  selectedId: "2",
  data: [
    {id: "1", value: 'hello'},
    {id: "2", value: 'hello2'}
  ]
})
window.s = select
