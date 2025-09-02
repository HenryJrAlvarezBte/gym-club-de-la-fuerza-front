import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

let root: any = null;

export function mount(element: HTMLElement) {
	if (!element) return;
	if (!root) {
		root = createRoot(element);
	}
	root.render(<App />);
}

export function unmount() {
	if (root) {
		try {
			root.unmount();
		} catch (e) {
			// noop
		}
		root = null;
	}
}
