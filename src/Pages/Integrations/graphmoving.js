import React, { Fragment } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {Sparklines,SparklinesBars,SparklinesLine} from "react-sparklines";

function boxMullerRandom() {
  let phase = true,
    x1,
    x2,
    w;

  return (function() {
    if (phase) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}


class ChartsSparklines1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    setInterval(
      () =>
        this.setState({
          data: this.state.data.concat([boxMullerRandom()]),
        }),
      200
    );
  }
  componeDidMount() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <Fragment>
        <CSSTransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
          transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}>
          <div>
                  <Sparklines data={this.state.data} limit={20}>
                      <SparklinesBars
                        style={{
                          fill: "#ed9521a8",
                          fillOpacity: "1",
                        }}/>
                      <SparklinesLine
                        style={{
                          stroke: "#4f3989",
                          fill: "none",strokeWidth:"3",fillOpacity: "1"
                        }}/>
                    </Sparklines> 
            
              </div>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export default ChartsSparklines1;
