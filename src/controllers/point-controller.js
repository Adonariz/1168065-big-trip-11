import {render, RenderPosition, replace} from "../utils/render";
import {ESC_KEY} from "../utils/const";
import EventItem from "../components/page-main/events/event-item";
import EventEdit from "../components/page-main/events/event-edit";

export default class PointController {
  constructor(container) {
    this._container = container;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event) {
    this._eventComponent = new EventItem(event);
    this._eventEditComponent = new EventEdit(event);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    this._eventEditComponent.setFavoriteButtonHandler(() => {

    });

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._eventComponent, this._eventEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === ESC_KEY) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
