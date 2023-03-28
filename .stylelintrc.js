module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
  ],
  plugins: ['stylelint-order', 'stylelint-config-rational-order/plugin'],
  rules: {
    'color-no-invalid-hex': true,
    'color-hex-length': 'long',
    'selector-max-class': 3,
    'no-descending-specificity': null,
    'declaration-block-no-shorthand-property-overrides': true,
    'comment-no-empty': true,
    'comment-whitespace-inside': 'always',
    'no-invalid-double-slash-comments': true,
    'no-duplicate-at-import-rules': true,
    // 'at-rule-no-unknown': false,
    'font-family-name-quotes': [
      'always-where-required',
      {
        severity: 'error',
      },
    ],
    'color-named': [
      'never',
      {
        severity: 'warning',
      },
    ],
    'unit-no-unknown': true,
    'order/order': [
      [
        'dollar-variables', // $variable
        'custom-properties', // --variable

        {
          type: 'at-rule', // @extend
          name: 'extend',
          hasBlock: false,
        },
        {
          type: 'at-rule', // @include variable
          name: 'include',
          hasBlock: false,
        },

        'declarations', // css rules

        {
          type: 'rule', // &: pseudo selector
          selector: '&:',
        },
        {
          type: 'rule', // &:: pseudo element
          selector: '&::',
        },
        {
          type: 'at-rule', // @include variable { nested rule }
          name: 'include',
          hasBlock: true,
        },
        {
          type: 'at-rule', // css @supports
          name: 'supports',
        },
        {
          type: 'at-rule', // @include media-breakpoint
          name: 'include',
          parameter: 'media',
          hasBlock: true,
        },
        {
          type: 'at-rule', // css @media
          name: 'media',
          hasBlock: true,
        },

        'at-rules', // all other css @rules
        {
          type: 'rule', // interpolation (#{$parent})
          selector: '#{',
          hasBlock: true,
        },
        {
          type: 'rule', // &__element
          selector: '&__',
        },
        {
          type: 'rule', // &--modifier
          selector: '&--',
        },

        'rules', // selectors (h1, .block etc.)
      ],
      { severity: 'warnings' },
    ],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': false,
      },
    ],
  },
};
