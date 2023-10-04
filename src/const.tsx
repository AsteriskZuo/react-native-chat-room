import { Platform } from 'react-native';

export const g_aspect_ratio = 390 / 844;
export const g_mask_color = 'hsla(0, 0%, 0%, 0.2)';
export const g_border_bottom_width = Platform.OS === 'ios' ? 1 : 1;
export const g_flatlist_border_bottom_width = Platform.OS === 'ios' ? 0.5 : 0.6;
