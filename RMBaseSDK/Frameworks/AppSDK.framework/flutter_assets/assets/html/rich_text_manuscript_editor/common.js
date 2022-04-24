/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行(前沿触发)，false 表非立即执行（后沿触发）
 */
function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout); // timeout是定时器ID，只有初始化状态下第一次触发的时候才不会执行；后续在周期内触发db函数会清除定时器，避免在周期内初始化timeout导致事件函数被执行
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null; // 如果周期内db函数未触发，则重新初始化timeout
      }, wait)
      if (callNow) func.apply(context, args) // 初始化状态下，立即执行事件函数
    }
    else {
      timeout = setTimeout(function () { // 在周期内db函数被触发会更新定时器，延迟事件函数的执行
        func.apply(context, args)
      }, wait);
    }
  }
}
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版（前沿触发），2 表定时器版（后沿触发）
 */
function throttle(func, wait) {
  let previous = 0;
  return function () {
    let context = this;
    let args = arguments;
    let now = Date.now();

    if (now - previous > wait) { // 初始状态下先执行一次事件函数，并且以当前时间戳为时间起点，往后只有经过的时间大于一个周期后触发th函数才会更新时间的起点并且执行事件函数
      func.apply(context, args);
      previous = now;
    }
  }
}