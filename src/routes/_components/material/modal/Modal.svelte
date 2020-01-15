
<script>
  import {MDCDialog} from '@material/dialog';
  import {onMount, onDestroy, getContext, setContext} from 'svelte';
  import {current_component} from 'svelte/internal';
  import {forwardEventsBuilder} from '@smui/common/forwardEvents.js';
  import {exclude} from '@smui/common/exclude.js';
  import {useActions} from '@smui/common/useActions.js';
  const forwardEvents = forwardEventsBuilder(current_component, ['MDCDialog:opening', 'MDCDialog:opened', 'MDCDialog:closing', 'MDCDialog:closed']);
  export let use = [];
  let className = '';
  export {className as class};
  export let escapeKeyAction = 'close';
  export let scrimClickAction = 'close';
  export let autoStackButtons = true;
  let element;
  let dialog;
  let addLayoutListener = getContext('SMUI:addLayoutListener');
  let removeLayoutListener;
  let layoutListeners = [];
  let addLayoutListenerFn = listener => {
    layoutListeners.push(listener);
    return () => {
      const idx = layoutListeners.indexOf(listener);
      if (idx >= 0) {
        layoutListeners.splice(idx, 1);
      }
    };
  };
  setContext('SMUI:addLayoutListener', addLayoutListenerFn);
  $: dialog && (dialog.escapeKeyAction = escapeKeyAction);
  $: dialog && (dialog.scrimClickAction = scrimClickAction);
  $: dialog && (dialog.autoStackButtons = autoStackButtons);
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  onMount(() => {
    dialog = new MDCDialog(element);
  });
  onDestroy(() => {
    dialog && dialog.destroy();
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function handleDialogOpened() {
    layoutListeners.forEach(listener => listener());
  }
  export function open(...args) {
    return dialog.open(...args);
  }
  export function close(...args) {
    return dialog.close(...args);
  }
  export function isOpen() {
    return dialog.isOpen;
  }
  export function layout(...args) {
    return dialog.layout(...args);
  }
</script>

<style type="text/scss">
  .mdc-modal__container {
    width: 100%;
  }
  .mdc-modal__surface {
    width: 100%;
    max-height: calc(100% - 32px);
    background: none;
    box-shadow: none;

    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
    pointer-events: auto;
    overflow-y: auto;
  }
  .mdc-modal__scrim {

  }
</style>

<div
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class="mdc-dialog {className}"
  role="alertdialog"
  aria-modal="true"
  on:MDCDialog:opened={handleDialogOpened}
  {...exclude($$props, ['use', 'class'])}
>
  <div class="mdc-dialog__container mdc-modal__container">
    <div class="mdc-dialog__surface mdc-modal__surface">
      <slot></slot>
    </div>
  </div>
  <div class="mdc-dialog__scrim mdc-modal__scrim"></div>
</div>
