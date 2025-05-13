/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';

export function useToolsPanelDropdownMenuProps() {
	const isMobile = useViewportMatch( 'medium', '<' );
	return ! isMobile
		? {
				popoverProps: {
					placement: 'left-start',
					offset: 259,
				},
		  }
		: {};
}
