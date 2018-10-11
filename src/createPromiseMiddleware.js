import { NAMESPACE_SEP } from './constants';

/*
连接 dva model里的 effect 到 redux 中间件中
*/

export default function createPromiseMiddleware(app) {
  return () => next => action => {
    const { type } = action;
    /*如果是effects*/
    if (isEffect(type)) {
      return new Promise((resolve, reject) => {
        next({
          __dva_resolve: resolve,
          __dva_reject: reject,
          ...action,
        });
      });
    } else {
      return next(action);
    }
  };
  /*检查是否为effect*/
  function isEffect(type) {
    if (!type || typeof type !== 'string') return false;
    const [namespace] = type.split(NAMESPACE_SEP);
    const model = app._models.filter(m => m.namespace === namespace)[0];
    if (model) {
      if (model.effects && model.effects[type]) {
        return true;
      }
    }

    return false;
  }
}
