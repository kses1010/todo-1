import { cardEditor } from "../utils/template";

export default class CardEditor {
	$cardEditor = null;
	$cancel = null;
	$save = null;

	constructor({ data, onSave }) {
		this.data = data;
		this.onSave = onSave;
		this.render();
		this.cacheDomElements();
		this.bindEventListener();
	}

	render() {
		document.getElementById("Todo").insertAdjacentHTML("afterend", cardEditor(this.data.contents));
	}

	cacheDomElements() {
		this.$cardEditor = document.querySelector(".card-editor");
		this.$cancel = this.$cardEditor.querySelector(".close-editor");
		this.$save = this.$cardEditor.querySelector(".save");
	}

	bindEventListener() {
		this.$cancel.addEventListener("click", this.toggleDisplay.bind(this, { visible: false }));
		this.$save.addEventListener("click", () => this.handleUpdatingCard());
	}

	handleUpdatingCard() {
		const newContents = this.$cardEditor.querySelector(".editor-contents").value;
		this.onSave(newContents);
		this.toggleDisplay({ visible: false });
	}

	toggleDisplay(nextData) {
		this.data = nextData;
		const {
			$cardEditor,
			data: { contents, visible },
		} = this;
		this.$cardEditor.querySelector(".editor-contents").value = contents;
		visible ? ($cardEditor.style.display = "block") : ($cardEditor.style.display = "none");
	}
}