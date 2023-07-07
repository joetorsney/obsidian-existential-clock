import { ItemView, Plugin, WorkspaceLeaf } from 'obsidian';
import { ClockView, VIEW_TYPE } from 'view';

export default class Clock extends Plugin {
	view: ItemView

	async onload() {
		this.registerView(
			'clock',
			(leaf: WorkspaceLeaf) => (this.view = new ClockView(leaf))
		);
        
        // TODO: add a thing in the settings to turn this on and off.
        this.activateView();

	}

    async onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE);
    }
    
    async activateView() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE);

        await this.app.workspace.getRightLeaf(false).setViewState({
            type: VIEW_TYPE,
            active: true,
        });

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]
        );
    }
}
