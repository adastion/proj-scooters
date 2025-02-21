import Alpine from 'alpinejs';

const myAlpinejs = () => {
  window.Alpine = Alpine;

  Alpine.store('mainData', {
    on: 'Hi Andrey!',
    titles: [],
    title: '',
    init() {
      const cards = document.querySelectorAll("[data-card='product']");
      cards.forEach((card) => {
        card.addEventListener('click', (e) => {
          this.titles.push(card.querySelector("[data-card='title']").textContent + "  - Цена: " + card.querySelector("[data-card='prise']").textContent);
        });
      });
      console.log(this.titles);
    },
  });
  Alpine.start();
};

export default myAlpinejs;
