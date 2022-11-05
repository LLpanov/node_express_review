const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const startOfDay = dayjs().utc().startOf('day').format();

console.log(startOfDay);
