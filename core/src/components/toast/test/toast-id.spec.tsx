import { newSpecPage } from '@stencil/core/testing';

import { Toast } from '../toast';
import { h } from '@stencil/core';

describe('toast: id', () => {
  it('toast should be assigned an incrementing id', async () => {
    const page = await newSpecPage({
      components: [Toast],
      html: `<ion-toast is-open="true"></ion-toast>`,
    });
    let toast: HTMLIonToastElement;

    toast = page.body.querySelector('ion-toast')!;

    expect(toast).not.toBe(null);
    expect(toast.getAttribute('id')).toBe('ion-overlay-1');

    // Remove the toast from the DOM
    toast.remove();
    await page.waitForChanges();

    // Create a new toast to verify the id is incremented
    toast = document.createElement('ion-toast');
    toast.isOpen = true;
    page.body.appendChild(toast);
    await page.waitForChanges();

    toast = page.body.querySelector('ion-toast')!;

    expect(toast.getAttribute('id')).toBe('ion-overlay-2');

    // Presenting the same toast again should reuse the existing id

    toast.isOpen = false;
    await page.waitForChanges();
    toast.isOpen = true;
    await page.waitForChanges();

    toast = page.body.querySelector('ion-toast')!;

    expect(toast.getAttribute('id')).toBe('ion-overlay-2');
  });

  it('should not overwrite the id set in htmlAttributes', async () => {
    const id = 'custom-id';
    const page = await newSpecPage({
      components: [Toast],
      template: () => <ion-toast htmlAttributes={{ id }} overlayIndex={-1}></ion-toast>,
    });

    const alert = page.body.querySelector('ion-toast')!;
    expect(alert.id).toBe(id);
  });
});
