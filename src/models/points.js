export default class Points {
  constructor() {
    this._points = [];

    this._dataChangeHandlers = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, updatedPoint) {
    const index = this._points.findIndex((point) => point.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), updatedPoint, this._points.slice(index + 1));

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
