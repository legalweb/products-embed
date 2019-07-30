import queryString from "query-string";

export function getEmptyChosen(available) {
  return available.reduce((chosen, filter, i) => {
    chosen[i] = filter.multiChoice ? [] : "";
    return chosen;
  }, []);
}

export function getQueryStringFromState(filterState) {
  return queryString.stringify(
    Object.keys(filterState.chosen).reduce((filters, chosen) => {
      const available = filterState.available[chosen];
      const isMulti = available.multiChoice;
      const value = filterState.chosen[chosen];

      if (isMulti) {
        const filteredValues = value.filter(f => (f ? f : false));

        if (filteredValues.length) {
          filters[available.key] = filteredValues.join(",");
        }

        return filters;
      }

      if (value) {
        filters[available.key] = value;
      }

      return filters;
    }, {})
  );
}

export function generateChipLabel(title, multi, chosen, choices) {
  const firstChosen = multi ? chosen[0] : chosen;
  const selected = choices.find(f => f.value === firstChosen);

  if (!multi && firstChosen) {
    return `${title}: ${selected.label}`;
  }

  if (multi && chosen.length > 0) {
    return `${title} +${chosen.length}`;
  }

  return title;
}

export function addChoiceToChosen(chosen, multi, choice) {
  if (multi) {
    if (chosen.indexOf(choice) === -1) {
      chosen.push(choice);
      return chosen;
    }

    return chosen.filter(f => f !== choice);
  }

  return choice;
}
