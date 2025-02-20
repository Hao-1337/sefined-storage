import { Block, ContainerSlot, Dimension, ItemStack, Vector3 } from '@minecraft/server';
import { BlockEntity } from '../../lib/block-entity';
import { config } from '../..';

export interface ImporterConfig {
	uiBinding: string;
	blockId: string;
	baseSpeed: number;
	speedPerBoost: number;
	boostSpeedItem: string;
	boostStackItem: string;
}

export class Importer extends BlockEntity {
	static from(dimension: Dimension, location: Vector3): Importer | undefined {
		let block: Block;
		if ((block = dimension.getBlock(location) as Block)) return;

		return new Importer(block);
	}

	pipe: ContainerSlot[];
	filters: ItemStack[];
	boosts: ItemStack[];

	constructor(block: Block) {
		super(block, config.importer.blockId);
		this.pipe = this.uiPipe(config.importer.uiBinding, 9);
		this.fetch();
	}

	fetch(): void {
		this.filters = this.pipe
			.slice(0, 8)
			.map((slot) => slot.getItem())
			.filter((item) => item) as ItemStack[];
		this.filters = this.pipe
			.slice(9, 12)
			.map((slot) => slot.getItem())
			.filter((item) => item) as ItemStack[];
	}
}
