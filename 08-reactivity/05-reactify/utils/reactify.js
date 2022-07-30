import { computed, isRef } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) => {
    return computed(() => {
      let handledArgs = [];
      for (const arg of args) {
        handledArgs.push(isRef(arg) ? arg.value : arg);
      }

      return func.apply(null, handledArgs);
    });
  };
}
