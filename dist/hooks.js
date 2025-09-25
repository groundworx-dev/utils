/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
export function useToolsPanelDropdownMenuProps() {
  const isMobile = useViewportMatch('medium', '<');
  return !isMobile ? {
    popoverProps: {
      placement: 'left-start',
      offset: 259
    }
  } : {};
}
export const POSITION_CLASSNAMES = {
  'top left': 'is-position-top-left',
  'top center': 'is-position-top-center',
  'top right': 'is-position-top-right',
  'center left': 'is-position-center-left',
  'center center': 'is-position-center-center',
  center: 'is-position-center-center',
  'center right': 'is-position-center-right',
  'bottom left': 'is-position-bottom-left',
  'bottom center': 'is-position-bottom-center',
  'bottom right': 'is-position-bottom-right'
};
export const DEFAULT_FOCAL_POINT = {
  x: 0.5,
  y: 0.5
};
export function mediaPosition({
  x,
  y
} = DEFAULT_FOCAL_POINT) {
  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}

/**
 * Checks of the contentPosition is the center (default) position.
 *
 * @param {string} contentPosition The current content position.
 * @return {boolean} Whether the contentPosition is center.
 */
export function isContentPositionCenter(contentPosition) {
  return !contentPosition || contentPosition === 'center center' || contentPosition === 'center';
}

/**
 * Retrieves the className for the current contentPosition.
 * The default position (center) will not have a className.
 *
 * @param {string} contentPosition The current content position.
 * @return {string} The className assigned to the contentPosition.
 */
export function getPositionClassName(contentPosition) {
  /*
   * Only render a className if the contentPosition is not center (the default).
   */
  if (isContentPositionCenter(contentPosition)) {
    return '';
  }
  return POSITION_CLASSNAMES[contentPosition];
}