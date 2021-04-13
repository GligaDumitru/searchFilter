export const AUTOCOMPLETE_TYPES = {
  STATUS_TYPE: 'STATUS_TYPE',
  COMPLETE_TYPE: 'COMPLETE_TYPE',
  MULTI_SELECT_TYPE: 'MULTI_SELECT_TYPE',
};

export const KEYS = {
  ESC_KEY: 27,
};

export const UTF8_ICONS = {
  EQUALS: '\u003D',
  NOT_EQUALS: '\u2260',
  GREATER_THEN: '\u003e',
  LESS_THEN: '\u003c',
  GREATER_OR_EQUAL_TO: '\u2265',
  LESS_OR_EQUAL_TO: '\u2264',
};

export const COMPLETE_OPTIONS = [
  {
    label: 'equals_to',
    name: `${UTF8_ICONS.EQUALS} Equals to`,
  },
  {
    label: 'not_equals_to',
    name: `${UTF8_ICONS.NOT_EQUALS} Not Equals to`,
  },
  {
    label: 'greater_then',
    name: `${UTF8_ICONS.GREATER_THEN} Greater then`,
  },
  {
    label: 'greater_or_equal_to',
    name: `${UTF8_ICONS.GREATER_OR_EQUAL_TO} Greater or equal to`,
  },
  {
    label: 'less_then',
    name: `${UTF8_ICONS.LESS_THEN} Less then`,
  },
  {
    label: 'less_or_equal_to',
    name: `${UTF8_ICONS.LESS_OR_EQUAL_TO} Less or equal to`,
  },
];

export const MULTI_SELECT_OPTIONS = [
  {
    label: 'equals',
    name: `${UTF8_ICONS.EQUALS} Equals`,
  },
  {
    label: 'not_equal',
    name: `${UTF8_ICONS.NOT_EQUALS} Not Equals`,
  },
];

export const STATUS_OPTIONS = [
  {
    label: 'draft',
    name: 'Draft',
  },
  {
    label: 'in_progress',
    name: 'In Progress',
  },
  {
    label: 'ready',
    name: 'Ready',
  },
  {
    label: 'completed',
    name: 'Completed',
  },
];

export const SEARCH_TERMS = [
  {
    label: 'name',
    name: 'Name',
    type: 'COMPLETE_TYPE',
    options: MULTI_SELECT_OPTIONS,
  },
  {
    label: 'status',
    name: 'Status',
    type: 'MULTI_SELECT_TYPE',
    options: MULTI_SELECT_OPTIONS,
    values: STATUS_OPTIONS,
  },
  {
    label: 'cost',
    name: 'Cost',
    type: 'COMPLETE_TYPE',
    options: COMPLETE_OPTIONS,
  },
  {
    label: 'start_date',
    name: 'Start Date',
    type: 'COMPLETE_TYPE',
    options: COMPLETE_OPTIONS,
  },
  {
    label: 'learners',
    name: 'Learners',
    type: 'COMPLETE_TYPE',
    options: COMPLETE_OPTIONS,
  },
  {
    label: 'trainer',
    name: 'Trainer',
    type: 'COMPLETE_TYPE',
    options: MULTI_SELECT_OPTIONS,
  },
];
