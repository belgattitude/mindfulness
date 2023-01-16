import { createVar, style } from '@vanilla-extract/css';
import { vars } from '@/themes/theme.css';

export const boxHeight = createVar('main-nav-height');

const stickyContainer = style({
  position: 'fixed',
  top: 0,
  zIndex: 50,
  borderBottom: 'rgba()',
});

export const container = style({
  display: 'flex',
  transition: 'all 250ms ease-in-out',
  // flexDirection: 'row',
  gap: '5px',
  // background: vars.color.brand,
  background: 'white',
  height: boxHeight,
  color: 'blue',
  padding: '16px',
  ':hover': {
    opacity: 0.8,
  },
  border: '10px solid red',
});
