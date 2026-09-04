import {formatCurrency} from '../scripts/utils/money.js';
if (formatCurrency(12345) === '123.45') {
  console.log('formatCurrency test passed');
}
else {
  console.error('formatCurrency test failed');
}