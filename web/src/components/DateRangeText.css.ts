import { style } from '@vanilla-extract/css';
import { vars } from '@/themes/theme.css';
export const root = style({
  background: vars.color.brand,
  color: 'blue',
  padding: '16px',
  transition: 'opacity .1s ease', // Testing autoprefixer
  ':hover': {
    opacity: 0.8,
  },
  border: '10px solid red',
});
