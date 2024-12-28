import { Decimal } from 'decimal.js';


export default function useFormatter() {
  // 將數字轉換為有千位分隔符的格式
  const formatNumber = (num) => {
    return `$ ${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  };

  // 將數字轉換為沒有千位分隔符的格式
  const unformatNumber = (str) => {
    return str.replace(/[^\d]/g, '');
  };

  return { formatNumber, unformatNumber };
}