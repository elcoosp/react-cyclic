import * as React from 'react';

function* cycleGenerator(it: any[], maxCycles: number = Infinity): IterableIterator<any[]> {
  let currCycle = 0;
  while (currCycle < maxCycles) {
    if (currCycle === maxCycles) break;
    yield* it;
    currCycle++;
  }
}

type Items = any[];
interface IProps {
  items: Items;
  perCycle: number;
  children(props: IInjectedProps): JSX.Element | JSX.Element[];
}
interface IState {
  currentItems: Items;
}
interface IInjectedProps {
  currentItems: Items;
  handleNext(): void;
}
export class Cyclic extends React.Component<IProps, IState> {
  state = {
    currentItems: [],
  };

  cycle = cycleGenerator(this.props.items);

  componentWillMount() {
    return this.handleNext();
  }

  handleNext = (): void => {
    const currentItems: IState['currentItems'] = [];

    while (currentItems.length <= this.props.perCycle - 1) currentItems.push(this.cycle.next().value);

    return this.setState(s => ({
      ...s,
      currentItems,
    }));
  };
  render() {
    return (
      <React.Fragment>
        {this.props.children({ currentItems: this.state.currentItems, handleNext: this.handleNext })}
      </React.Fragment>
    );
  }
}
