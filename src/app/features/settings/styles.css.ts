import { style } from '@vanilla-extract/css';
import { config } from 'folds';

export const SequenceCardStyle = style({
  padding: config.space.S300,
});

export const CompactSequenceCardStyle = style({
  padding: config.space.S200,
});
