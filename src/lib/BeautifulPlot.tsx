import { LinePlot, Plot } from "@hhenrichsen/motion-canvas-graphing";
import {
  Circle,
  Latex,
  Line,
  Node,
  NodeProps,
  PropertyMetadata,
  computed,
  signal,
} from "@motion-canvas/2d";
import {
  ColorSignal,
  PossibleColor,
  SignalValue,
  SimpleSignal,
  SimpleVector2Signal,
  Vector2,
  createRef,
} from "@motion-canvas/core";

export interface BetterPlotProps extends NodeProps {
  position: SignalValue<Vector2>;
  size: SignalValue<number>;

  color: SignalValue<PossibleColor>;
  lineColor: SignalValue<PossibleColor>;
  lineWidth: SignalValue<number>;

  min: SignalValue<number[]>;
  max: SignalValue<number[]>;

  opacity: SignalValue<number>;
}

export class BetterPlot extends Node {
  @signal()
  public declare readonly size: SimpleSignal<number, this>;

  @signal()
  public declare readonly color: ColorSignal<this>;

  @signal()
  public declare readonly lineColor: ColorSignal<this>;

  @signal()
  public declare readonly lineWidth: SimpleSignal<number, this>;

  @signal()
  public declare readonly min: SimpleSignal<number[], this>;

  @signal()
  public declare readonly max: SimpleSignal<number[], this>;

  public plot: ReturnType<typeof createRef<Plot>>;
  public line: ReturnType<typeof createRef<LinePlot>>;

  public constructor(props?: BetterPlotProps) {
    super({
      ...props,
      position: props.position,
    });

    this.plot = createRef<Plot>();
    this.line = createRef<LinePlot>();

    this.add(
      <>
        <Line
          points={[new Vector2(((-995 * this.size())/2), 0), new Vector2((995 * this.size())/2, 0)]}
          stroke={props.color}
          lineWidth={4}
          endArrow
        />
        <Line
          points={[new Vector2(0, ((995 * this.size())/2)), new Vector2(0, (-995 * this.size())/2)]}
          stroke={props.color}
          lineWidth={4}
          endArrow
        />

        <Plot
          clip
          size={995 * this.size()}
          ref={this.plot}
          labelSizeX={40}
          labelSizeY={40}
          min={() => [this.min()[0], this.min()[1]]}
          max={() => [this.max()[0], this.max()[1]]}
          ticks={[0, 0]}
          opacity={1}
          tickLabelSizeY={40}
          gridStrokeWidth={1}
          axisColorX={"#00000000"}
          axisColorY={"#00000000"}
        >
          <LinePlot
            lineWidth={props.lineWidth}
            stroke={props.lineColor}
            opacity={0}
            ref={this.line}
          />
        </Plot>
      </>
    );
  }

  pushFn(fn: (x: number) => number) {
    this.line().data(this.plot().makeGraphData(0.01, fn));
  }

  private customCreateGraphData(fn: (x: number) => number) {
    let int = 0.01;
    let from = -15;
    let to = 15;

    let data = [];

    for (let i = from; i < to; i += int) {
      data.push([i, fn(i)]);
    }

    return data;
  }

  *tweenFn(fn: (x: number) => number, time: number) {
    // @ts-ignore
    yield* this.line().data(this.customCreateGraphData(fn), time);
  }
}
