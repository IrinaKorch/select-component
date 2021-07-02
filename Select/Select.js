export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

    this.#render()
    this.#setup()
  }
  open() {
    this.$el.classList.add('open')
    this.$caret.classList.remove('fa-caret-down')
    this.$caret.classList.add('fa-caret-up')
  }
  close() {
    this.$el.classList.remove('open')
    this.$caret.classList.remove('fa-caret-up')
    this.$caret.classList.add('fa-caret-down')
  }
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
  }
  #render() {
    const {data, placeholder} = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)

  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$caret = this.$el.querySelector('[data-type="caret"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler(event) {
    const {type} = event.target.dataset
    switch(type) {
      case 'input' :
        this.toggle()
      break
      case 'item' :
        const id = event.target.dataset.id
        this.select(id)
      break
    }
  }
  get isOpen() {
    return this.$el.classList.contains('open')
  }
  get current() {
    return this.options.data.find(item => item.id === this.selectedId)
  }

  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value
    this.$el.querySelectorAll('[data-type="item"]')
      .forEach(el => el.classList.remove('selected'))
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }
}
const getTemplate = (data = [], placeholder) => {
  const text = placeholder ?? ''
  const items = data.map(item => `<li data-id="${item.id}" data-type="item" class="select__item">${item.value}</li>`)
  return `
  <div class="select__input" data-type="input">
    <span data-type="value">${text}</span>
    <i class="fas fa-caret-down" data-type="caret"></i>
  </div>
    <div class="select__dropdown">  
      <ul class="select__list">         
           ${items.join('')}
      </ul>
    </div>
  `
}
