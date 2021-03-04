/** Data for 7 Stepper steps
 * FS: First step, checks if user knows the license (and we need to open the dropdown)
 * BY, NC, ND, SA: license attribute selection steps
 * DD: Step with Dropdown for quick license selection, opens if user knows the license
 * CW: Copyright waiver step for CC0 if the user selects NO on BY step
 * AD: Attribution Details step with the form
 *
 * Properties:
 * visible: sets whether the step should be shown or not. Eg. if BY is selected,
 * Copyright Waiver should not be shown, as the user will not waive copyright
 *
 * enabled: sets whether the step can be clicked/selected.
 * Eg. SA shouldn't be selectable if ND was selected
 *
 * status: can be set to 'active', 'completed', or 'inactive', to show the user's
 * progress in Stepper
 *
 * selected: set to undefined before the user interacts with a step; true/false after
 * user selects radio buttons/ checkboxes/ etc.
 */
export const initialSteps = [
  { id: 0, name: 'FS', visible: true, enabled: true, status: 'active', selected: undefined },
  { id: 1, name: 'AL', visible: true, enabled: true, status: 'inactive', selected: undefined },
  { id: 2, name: 'BY', visible: true, enabled: true, status: 'inactive', selected: undefined },
  { id: 3, name: 'NC', visible: true, enabled: true, status: 'inactive', selected: undefined },
  { id: 4, name: 'ND', visible: true, enabled: true, status: 'inactive', selected: undefined },
  { id: 5, name: 'SA', visible: true, enabled: true, status: 'inactive', selected: undefined },
  { id: 6, name: 'DD', visible: false, enabled: true, status: 'inactive', selected: undefined },
  { id: 7, name: 'CW', visible: false, enabled: true, status: 'inactive', selected: undefined },
  { id: 8, name: 'AD', visible: true, enabled: true, status: 'inactive', selected: undefined },
]
