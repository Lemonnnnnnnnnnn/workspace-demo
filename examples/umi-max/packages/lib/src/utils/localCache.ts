const setItem = (key: string, value: any) => window.localStorage.setItem(`yg-operation-${key}`, value);
const getItem = (key: any) => window.localStorage.getItem(`yg-operation-${key}`);
const removeItem = (key: any) => window.localStorage.removeItem(`yg-operation-${key}`);
const clear = () => {
  const loginName = getItem('loginName');
  const clockId = getItem('clockId');
  const len = localStorage.length;
  const currentLocalCatch = [];
  for (let i = 0; i < len; i++) {
    if (localStorage.key(i)?.indexOf('yg-operation-') === 0) {
      currentLocalCatch.push(localStorage.key(i));
    }
  }
  currentLocalCatch.forEach((item: string | null) => item && window.localStorage.removeItem(item));
  setItem('clockId', clockId);
  if (loginName) {
    setItem('loginName', loginName);
  }
};

export default {
  setItem,
  getItem,
  removeItem,
  clear,
};
