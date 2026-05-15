const swatchData = {
  text: [
    ['Text/colorTextBase','#000000'],
    ['Text/colorText','#1f1f1f'],
    ['Text/colorTextSecondary','#595959'],
    ['Text/colorTextTertiary','#8c8c8c'],
    ['Text/colorTextQuaternary','#bfbfbf'],
    ['Text/colorTextLight','#ffffff'],
  ],
  background: [
    ['Background/colorBgBaseWhite','#ffffff'],
    ['Background/colorBgBaseBlack','#000000'],
    ['Background/colorBgLayout','#f4f6f8'],
    ['Background/colorBgDark','#141414'],
    ['Background/colorBgContainer','#ffffff'],
    ['Background/colorBgContainerDisabled','#f5f5f5'],
  ],
  fill: [
    ['Fill/colorFill','#ebebeb'],
    ['Fill/colorFillSecondary','#f5f5f5'],
    ['Fill/colorFillTertiary','#fafafa'],
  ],
  border: [
    ['Border/colorBorder','#dbdbdb'],
    ['Border/colorBorderDark','#8d8d8f'],
    ['Border/colorBorderSecondary','#ebebeb'],
    ['Border/colorBorderDisabled','#ebebeb'],
  ],
  primary: [
    ['Primary/colorPrimaryBg','#f5f9ff'],
    ['Primary/colorPrimaryBgHover','#e8f2ff'],
    ['Primary/colorPrimaryBorder','#c9dfff'],
    ['Primary/colorPrimaryBorderHover','#a1c3ff'],
    ['Primary/colorPrimaryHover','#78a5ff'],
    ['Primary/colorPrimary','#4e84ff'],
    ['Primary/colorPrimaryActive','#2660ff'],
    ['Primary/colorPrimaryTextHover','#1643d9'],
    ['Primary/colorPrimaryText','#0024b2'],
    ['Primary/colorPrimaryTextActive','#00178c'],
  ],
  status: [
    ['Success/colorSuccess','#52c41a'],
    ['Warning/colorWarning','#faad14'],
    ['Error/colorError','#f5222d'],
  ],
  'service-misc': [
    ['Service/colorService_business','#003cd5'],
    ['Service/colorService_Community','#2ac1bc'],
    ['Service/colorService_Point','#23c17d'],
  ],
};

const services = [
  { name: 'Baropharm', steps: ['#f5f9ff','#e8f2ff','#c9dfff','#a1c3ff','#78a5ff','#4e84ff','#2660ff','#1643d9','#0024b2','#00178c'] },
  { name: 'Pillens', steps: ['#eaebfd','#cbccf9','#a7abf4','#8289f0','#666dec','#4b4fe6','#4647da','#3d3cce','#3530c2','#2615b0'] },
  { name: 'Aroundpharm', steps: ['#e9fbf8','#b5f5ec','#87e8de','#5cdbd3','#36cfc9','#09b9ba','#08979c','#006d75','#00474f','#002329'] },
  { name: 'BRPinsight', steps: ['#f9f0ff','#efdbff','#d3adf7','#b37feb','#9254de','#722ed1','#531dab','#391085','#22075e','#120338'] },
  { name: 'Community', steps: ['#e7f8f8','#d5f6f5','#adebeb','#88e3df','#43d1cc','#27b4b0','#21a19c','#1f9995','#19807d','#146664'] },
  { name: 'PharmAll', steps: ['#f0f5ff','#d6e4ff','#adc6ff','#85a5ff','#597ef7','#2f54eb','#1d39c4','#10239e','#061178','#030852'] },
];
const stepLabels = ['Bg','BgHover','Border','BorderHover','Hover','Primary','Active','TextHover','Text','TextActive'];

const palette = {
  grey: ['#fafafa','#f5f5f5','#ebebeb','#dbdbdb','#c7c7c7','#adadad','#8d8d8f','#69696b','#424242','#141414'],
  blue: ['#f5f9ff','#e8f2ff','#c9dfff','#a1c3ff','#78a5ff','#4e84ff','#2660ff','#1643d9','#0024b2','#00178c'],
  cyan: ['#e6fffb','#b5f5ec','#87e8de','#5cdbd3','#36cfc9','#13c2c2','#08979c','#006d75','#00474f','#002329'],
  purple: ['#f9f0ff','#efdbff','#d3adf7','#b37feb','#9254de','#722ed1','#531dab','#391085','#22075e','#120338'],
  green: ['#f0fde2','#d9f7be','#b7eb8f','#95de64','#73d13d','#52c41a','#389e0d','#237804','#135200','#092b00'],
  magenta: ['#fff0f6','#ffd6e7','#ffadd2','#ff85c0','#f759ab','#eb2f96','#c41d7f','#9e1068','#780650','#520339'],
  red: ['#fff1f0','#ffccc7','#ffa39e','#ff7875','#ff4d4f','#f5222d','#cf1322','#a8071a','#820014','#5c0011'],
  gold: ['#fffbe6','#fff1b8','#ffe58f','#ffd666','#ffc53d','#faad14','#d48806','#ad6800','#874d00','#613400'],
  orange: ['#fff7e6','#ffe7ba','#ffd591','#ffc069','#ffa940','#fa8c16','#d46b08','#ad4e00','#873800','#612500'],
  volcano: ['#fff2e8','#ffd8bf','#ffbb96','#ff9c6e','#ff7a45','#fa541c','#d4380d','#ad2102','#871400','#610b00'],
  yellow: ['#feffe6','#ffffb8','#fffb8f','#fff566','#ffec3d','#fadb14','#d4b106','#ad8b00','#876800','#614700'],
  geekblue: ['#f0f5ff','#d6e4ff','#adc6ff','#85a5ff','#597ef7','#2f54eb','#1d39c4','#10239e','#061178','#030852'],
  lime: ['#fcffe6','#f4ffb8','#eaff8f','#d3f261','#bae637','#a0d911','#7cb305','#5b8c00','#3f6600','#254000'],
};

const memberships = [
  { name: 'Family', fg: '#7a99ab', bg: '#f4f7f8' },
  { name: 'Red', fg: '#e43a3d', bg: '#fdefef' },
  { name: 'Blue', fg: '#007dcb', bg: '#ebf5fc' },
  { name: 'Green', fg: '#25b01e', bg: '#ecf9f2' },
  { name: 'Orange', fg: '#fc7f00', bg: '#fff5eb' },
  { name: 'Purple', fg: '#9e50b9', bg: '#f6f0fb' },
  { name: 'Black', fg: '#31383f', bg: '#f1f3f5' },
];

const partners = [
  ['아워팜','#43a536'],['켄뷰','#00b197'],['경동제약','#49a993'],['퍼슨','#dd4349'],
  ['한독','#0079c2'],['옵투스','#36125c'],['영진약품','#f7941d'],['CMG제약','#38b781'],
  ['부광약품','#7cbe28'],['휴온스','#185bae'],['마더스','#e5006e'],['코오롱제약','#e81c28'],
  ['파마리서치','#3dae2b'],['대원제약','#e4032e'],['Sk케미칼','#ea002c'],['익수제약','#e60012'],
  ['유유제약','#004a97'],['일동후디스','#e60021'],['뉴트리','#076d3a'],['현대약품','#005b69'],
  ['앨리스랩','#004079'],['한풍제약','#2e3092'],
];

/* Brand logos catalog. Add new brands here when more Figma exports arrive. */
const brandLogos = [
  {
    name: 'Baropharm',
    color: '#4e84ff',
    files: [
      { label: '기본형 (영문)', file: 'logos/baropharm/baropharm-en.png', desc: 'EN horizontal · PNG' },
      { label: '국문형', file: 'logos/baropharm/baropharm-kr.png', desc: 'KR with icon · PNG' },
    ],
  },
  {
    name: 'Pillens',
    color: '#4b4fe6',
    files: [
      { label: '기본형 (영문)', file: 'logos/pillens/pillens-en.png', desc: 'EN horizontal · PNG' },
    ],
  },
];
