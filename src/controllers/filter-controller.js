import {FilterType} from "../utils/const";
import {render, RenderPosition, replace} from "../utils/render";
import TripFiltersComponent from "../components/page-header/trip-filters";
import {getPointsByFilter} from "../utils/filter";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const oldComponent = this._filterComponent;
    const allPoints = this._pointsModel.getPointsAll();

    const filters = Object.values(FilterType)
      .map((filterType) => {
        return {
          name: filterType,
          count: getPointsByFilter(allPoints, filterType),
          checked: filterType === this._activeFilterType,
        };
      });

    this._filterComponent = new TripFiltersComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
