import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE = "clock";

export class ClockView extends ItemView {
    time: string
    timeElement: HTMLElement

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
        this.time = this.currentTimeString();
    }

    getViewType() {
        return VIEW_TYPE;
    }

    getDisplayText() {
        return "Existential clock";
    }

    getIcon(): string {
        return "clock";
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        this.timeElement = container.createEl("h4", { text: this.time });

        const t = setInterval(() => {
            this.time = this.currentTimeString(); 
            this.timeElement.setText(this.time)
        }, 1000);  
    }

    async onClose() {
        // Nothing to clean up.
    }

    // TODO make this not a class method.
    currentTimeString(): string {
        // TODO: add a leading zero to single digit times.
        const date = new Date(); 
        const hh = date.getHours();
        const mm = date.getMinutes();
        const ss = date.getSeconds();

        return `${hh}:${mm}:${ss}`
    }
}