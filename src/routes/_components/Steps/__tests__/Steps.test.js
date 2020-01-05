// require('@testing-library/jest-dom/extend-expect');
// const { cleanup, fireEvent, render, prettyDOM } = require('@testing-library/svelte');
// const { tick } = require('svelte');
//
// const App = require('./Steps.test.svelte');
//
// expect.extend({
//   toBeSelectedStep(step) {
//     return {
//       pass: step.classList.contains('svelte-steps__selected') && step.getAttribute('aria-selected') === 'true',
//       message: () => this.isNot ? 'Step was selected' : 'Step was not selected'
//     };
//   }
// });
//
// beforeEach(cleanup);
//
// describe('Steps', () => {
//   it('should show the first step by default', () => {
//     const { getByText } = render(App);
//
//     const firstStep = getByText('Step One');
//     expect(firstStep).toHaveClass('svelte-steps__selected');
//     expect(firstStep.getAttribute('aria-selected')).toBe('true');
//
//     const firstStepPanel = getByText('Panel One');
//     expect(firstStepPanel).toBeInTheDocument();
//   });
//
//   it('should switch steps by clicking', async () => {
//     const { getByText, queryByText } = render(App);
//
//     const firstStep = getByText('Step One');
//
//     const secondStep = getByText('Step Two');
//     fireEvent.click(secondStep);
//     await tick();
//
//     expect(secondStep).toBeSelectedStep();
//     expect(getByText('Panel Two')).toBeInTheDocument();
//
//     expect(firstStep).not.toBeSelectedStep();
//     expect(queryByText('Panel One')).not.toBeInTheDocument();
//   });
//
//   it('should have the proper aria-controls and aria-labelledby relationships', async () => {
//     const { getByText } = render(App);
//
//     await tick();
//
//     const firstStep = getByText('Step One');
//     const firstStepPanel = getByText('Panel One').parentElement;
//
//     expect(firstStep.getAttribute('aria-controls')).toEqual(firstStepPanel.id);
//     expect(firstStepPanel.getAttribute('aria-labelledby')).toEqual(firstStep.id);
//   });
//
//   it('should cycle steps with the right arrow key', async () => {
//     const { getByText } = render(App);
//     await tick();
//
//     const firstStep = getByText('Step One');
//     fireEvent.keyDown(firstStep, { key: 'ArrowRight' });
//     await tick();
//
//     const secondStep = getByText('Step Two');
//     expect(secondStep).toBeSelectedStep();
//     expect(firstStep).not.toBeSelectedStep();
//     fireEvent.keyDown(secondStep, { key: 'ArrowRight' });
//     await tick();
//
//     const thirdStep = getByText('Step Three');
//     expect(thirdStep).toBeSelectedStep();
//     expect(secondStep).not.toBeSelectedStep();
//     fireEvent.keyDown(thirdStep, { key: 'ArrowRight' });
//     await tick();
//
//     expect(firstStep).toBeSelectedStep();
//     expect(thirdStep).not.toBeSelectedStep();
//   });
//
//   it('should cycle steps with the left arrow key', async () => {
//     const { getByText } = render(App);
//     await tick();
//
//     const firstStep = getByText('Step One');
//     fireEvent.keyDown(firstStep, { key: 'ArrowLeft' });
//     await tick();
//
//     const thirdStep = getByText('Step Three');
//     expect(thirdStep).toBeSelectedStep();
//     expect(firstStep).not.toBeSelectedStep();
//     fireEvent.keyDown(thirdStep, { key: 'ArrowLeft' });
//     await tick();
//
//     const secondStep = getByText('Step Two');
//     expect(secondStep).toBeSelectedStep();
//     expect(thirdStep).not.toBeSelectedStep();
//     fireEvent.keyDown(secondStep, { key: 'ArrowLeft' });
//     await tick();
//
//     expect(firstStep).toBeSelectedStep();
//     expect(secondStep).not.toBeSelectedStep();
//   });
// });
