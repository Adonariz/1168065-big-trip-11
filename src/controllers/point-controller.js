import {remove, render, RenderPosition, replace} from "../utils/render";
import {ESC_KEY} from "../utils/const";
import EventItem from "../components/page-main/events/event-item";
import EventEdit from "../components/page-main/events/event-edit";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._viewMode = Mode.DEFAULT;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventComponent = new EventItem(event);
    this._eventEditComponent = new EventEdit(event);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    this._eventEditComponent.setFavoriteButtonHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    if (oldEventComponent && oldEventEditComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
      this._replaceEditToEvent();
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  destroy() {
    if (this._eventComponent) {
      remove(this._eventComponent);
      this._eventComponent = null;
    }

    if (this._eventEditComponent) {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._eventEditComponent.removeFlatpickr();
      remove(this._eventEditComponent);
      this._eventEditComponent = null;
    }
  }

  setDefaultView() {
    if (this._viewMode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);
    }

    this._viewMode = Mode.DEFAULT;
    this._eventEditComponent.removeFlatpickr();
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._viewMode = Mode.EDIT;
    this._eventEditComponent.applyFlatpickr();
  }

  _onEscKeyDown(evt) {
    if (evt.key === ESC_KEY) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
