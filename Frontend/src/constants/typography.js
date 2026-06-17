import { PixelRatio } from 'react-native';

const fontScale = (size) => PixelRatio.roundToNearestPixel(size);

const Typography = {
  hero: {
    fontSize: fontScale(30),
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: fontScale(28),
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionHeading: {
    fontSize: fontScale(21),
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: fontScale(17),
    fontWeight: '600',
  },
  body: {
    fontSize: fontScale(15),
    fontWeight: '400',
    lineHeight: fontScale(22),
  },
  bodySmall: {
    fontSize: fontScale(14),
    fontWeight: '400',
    lineHeight: fontScale(20),
  },
  caption: {
    fontSize: fontScale(12),
    fontWeight: '500',
  },
  label: {
    fontSize: fontScale(12),
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: fontScale(16),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonSmall: {
    fontSize: fontScale(14),
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  tabLabel: {
    fontSize: fontScale(11),
    fontWeight: '600',
  },
};

export default Typography;
