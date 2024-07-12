class CardSet {
  constructor(searchID, editID, title, cards) {
    this.title = title;
    this.searchID = searchID;
    this.editID = editID;
    this.cards = cards;
  }

  objectify() {
    return {
      title: this.title,
      searchID: this.searchID,
      editID: this.editID,
      cards: this.cards,
    };
  }
}

export default CardSet;
