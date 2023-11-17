/** 公共类型与类型泛型方法 */

// 将对象中的某些属性去除
export type CustomRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
} & Omit<T, K>;
