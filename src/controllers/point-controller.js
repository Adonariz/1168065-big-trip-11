import EventEdit from "../components/page-main/events/event-edit";
import {render, RenderPosition, replace} from "../utils/render";
import {ESC_KEY} from "../utils/const";

// const renderTripDayEventsItem = (eventsListItem, eventComponents) => {
//   eventComponents.forEach((eventComponent) => {
//     const eventEditComponent = new EventEdit(eventComponent.getData());
//
//     const replaceEventToEdit = () => {
//       replace(eventEditComponent, eventComponent);
//       document.addEventListener(`keydown`, onEscKeyDown);
//     };
//
//     const onEscKeyDown = (evt) => {
//       if (evt.key === ESC_KEY) {
//         replaceEditToEvent();
//         document.removeEventListener(`keydown`, onEscKeyDown);
//       }
//     };
//
//     const replaceEditToEvent = () => {
//       replace(eventComponent, eventEditComponent);
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     };
//
//     eventComponent.setEditButtonClickHandler(replaceEventToEdit);
//     eventEditComponent.setSubmitHandler(replaceEditToEvent);
//
//     render(eventsListItem, eventComponent, RenderPosition.BEFOREEND);
//   });
// };

export default class PointController {
  constructor(container) {
    this._container = container;

    this._eventEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    this._task = task.getData();
    this._eventEditComponent = new EventEdit(this._task);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
