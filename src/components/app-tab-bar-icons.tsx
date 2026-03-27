import Svg, { Path, Rect } from 'react-native-svg';

type IconProps = Readonly<{
  size: number;
  color: string;
}>;

export const HomeTabIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="8" height="8" rx="1.5" stroke={color} strokeWidth="2" />
    <Rect x="13" y="3" width="8" height="8" rx="1.5" stroke={color} strokeWidth="2" />
    <Rect x="3" y="13" width="8" height="8" rx="1.5" stroke={color} strokeWidth="2" />
    <Rect x="13" y="13" width="8" height="8" rx="1.5" stroke={color} strokeWidth="2" />
  </Svg>
);

export const RecoveryTabIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19V5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M9 19V11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M14 19V8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M19 19V14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const LibraryTabIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 4h5a2 2 0 012 2v14a2 2 0 00-2-2H6V4z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Path
      d="M13 4h5a2 2 0 012 2v14a2 2 0 01-2 2h-5"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CommunityTabIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 10a3 3 0 106 0 3 3 0 00-6 0z"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M12 14c-3.5 0-6 2-6 4v1h12v-1c0-2-2.5-4-6-4z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Path
      d="M16 8a2.5 2.5 0 013 2.4V12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M19 15v1"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const UserTabIcon = ({ size, color }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 7h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4 12h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4 17h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);
